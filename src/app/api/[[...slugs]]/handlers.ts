import { Message, realtime } from '@/lib/realtime';
import { redis } from '@/lib/redis';
import { nanoid } from 'nanoid';
import { ROOM_TTL_SECONDS, getRoomMessagesKey, getRoomMetaKey } from './utils';

export const createRoomHandler = async () => {
	const roomId = nanoid();
	const metaKey = getRoomMetaKey(roomId);

	await redis.hset(metaKey, {
		connected: [],
		createdAt: Date.now(),
	});

	await redis.expire(metaKey, ROOM_TTL_SECONDS);

	return { roomId };
};

export const getRoomTTLHandler = async ({
	auth,
}: {
	auth: { roomId: string };
}) => {
	const ttl = await redis.ttl(getRoomMetaKey(auth.roomId));
	return { ttl: ttl > 0 ? ttl : 0 };
};

export const deleteRoomHandler = async ({
	auth,
}: {
	auth: { roomId: string };
}) => {
	const { roomId } = auth;

	await realtime.channel(roomId).emit('chat.destroy', { isDestroyed: true });

	await Promise.all([
		redis.del(roomId),
		redis.del(getRoomMetaKey(roomId)),
		redis.del(getRoomMessagesKey(roomId)),
	]);
};

export const sendMessageHandler = async ({
	body,
	auth,
}: {
	body: { sender: string; text: string };
	auth: { roomId: string; token: string };
}) => {
	const { roomId } = auth;
	const { sender, text } = body;
	const metaKey = getRoomMetaKey(roomId);
	const messagesKey = getRoomMessagesKey(roomId);

	const roomExists = await redis.exists(metaKey);

	if (!roomExists) {
		throw new Error('Room does not exist or has expired');
	}

	const message: Message = {
		id: nanoid(),
		sender,
		text,
		timestamp: Date.now(),
		roomId,
	};

	await redis.rpush(messagesKey, {
		...message,
		token: auth.token,
	});
	await realtime.channel(roomId).emit('chat.message', message);

	const remainingTTL = await redis.ttl(metaKey);

	await redis.expire(messagesKey, remainingTTL);
	await redis.expire(roomId, remainingTTL);
};

export const getMessagesHandler = async ({
	auth,
}: {
	auth: { roomId: string; token: string };
}) => {
	const messages = await redis.lrange<Message>(
		getRoomMessagesKey(auth.roomId),
		0,
		-1
	);

	return {
		messages: messages.map(message => ({
			...message,
			token: message.token === auth.token ? auth.token : undefined,
		})),
	};
};

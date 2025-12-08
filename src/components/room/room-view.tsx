'use client';

import { ChatInput } from '@/components/room/chat-input';
import { MessageList } from '@/components/room/message-list';
import { RoomHeader } from '@/components/room/room-header';
import { useRoom } from '@/hooks/use-room';

interface RoomViewProps {
	roomId: string;
}

export function RoomView({ roomId }: RoomViewProps) {
	const {
		username,
		messages,
		timeRemaining,
		sendMessage,
		isSending,
		destroyRoom,
	} = useRoom(roomId);

	return (
		<main className='flex flex-col h-screen max-h-screen overflow-hidden'>
			<RoomHeader
				roomId={roomId}
				timeRemaining={timeRemaining}
				onDestroy={() => destroyRoom()}
			/>

			<MessageList messages={messages} username={username} />

			<ChatInput
				onSend={async text => {
					await sendMessage({ text });
				}}
				isPending={isSending}
			/>
		</main>
	);
}

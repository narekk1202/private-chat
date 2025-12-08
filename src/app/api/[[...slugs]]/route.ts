import { Elysia } from 'elysia';
import z from 'zod';
import { authMiddleware } from './auth';
import {
	createRoomHandler,
	deleteRoomHandler,
	getMessagesHandler,
	getRoomTTLHandler,
	sendMessageHandler,
} from './handlers';

const rooms = new Elysia({ prefix: '/rooms' })
	.post('/create', createRoomHandler)
	.use(authMiddleware)
	.get('/ttl', getRoomTTLHandler, { query: z.object({ roomId: z.string() }) })
	.delete('/', deleteRoomHandler, { query: z.object({ roomId: z.string() }) });

const messages = new Elysia({ prefix: '/messages' })
	.use(authMiddleware)
	.post('/', sendMessageHandler, {
		query: z.object({ roomId: z.string() }),
		body: z.object({
			sender: z.string().max(100),
			text: z.string().max(1000),
		}),
	})
	.get('/', getMessagesHandler, { query: z.object({ roomId: z.string() }) });

const app = new Elysia({ prefix: '/api' }).use(rooms).use(messages);

export const GET = app.fetch;
export const POST = app.fetch;
export const DELETE = app.fetch;

export type App = typeof app;

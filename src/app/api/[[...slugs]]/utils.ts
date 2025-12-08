export const ROOM_TTL_SECONDS = 60 * 10; // 10 minutes

export const getRoomMetaKey = (roomId: string) => `meta:${roomId}`;
export const getRoomMessagesKey = (roomId: string) => `messages:${roomId}`;

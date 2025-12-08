'use client';

import { useLobby } from '@/hooks/use-lobby';

const CreateRoomButton = () => {
	const { isPending, createRoom } = useLobby();

	return (
		<button
			onClick={() => createRoom()}
			disabled={isPending}
			className='w-full bg-zinc-100 text-black p-3 sm:p-3 text-xs sm:text-sm font-bold hover:bg-zinc-50 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50 min-h-[44px]'
		>
			CREATE SECURE ROOM
		</button>
	);
};

export default CreateRoomButton;

'use client';

import { useUsername } from '@/hooks/use-username';
import CreateRoomButton from './create-room-button';

const IdentitySection = () => {
	const { username } = useUsername();

	return (
		<div className='border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6 backdrop-blur-md'>
			<div className='space-y-4 sm:space-y-5'>
				<div className='space-y-2'>
					<label className='flex items-center text-zinc-500 text-sm sm:text-base'>
						Your Identity
					</label>
					<div className='flex items-center gap-2 sm:gap-3'>
						<div className='flex-1 bg-zinc-900/50 border border-zinc-800 p-2.5 sm:p-3 text-xs sm:text-sm text-zinc-400 font-mono truncate'>
							{username}
						</div>
					</div>
				</div>
				<CreateRoomButton />
			</div>
		</div>
	);
};

export default IdentitySection;

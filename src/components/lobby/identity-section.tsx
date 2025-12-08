'use client'

import { useUsername } from '@/hooks/use-username';
import CreateRoomButton from './create-room-button';

const IdentitySection = () => {
	const { username } = useUsername();

	return (
		<div className='border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md'>
			<div className='space-y-5'>
				<div className='space-y-2'>
					<label className='flex items-center text-zinc-500'>
						Your Identity
					</label>
					<div className='flex items-center gap-3'>
						<div className='flex-1 bg-zinc-900/50 border border-zinc-800 p-3 text-sm text-zinc-400 font-mono'>
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

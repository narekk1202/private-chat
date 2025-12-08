import { RoomErrors } from '@/types/room.types';

type ErrorSectionProps = {
	error: RoomErrors;
	wasDestroyed: boolean;
};

const ErrorSection = ({ error, wasDestroyed }: ErrorSectionProps) => {
	return (
		<>
			{wasDestroyed && (
				<div className='bg-red-900 text-red-100 p-3 sm:p-4 rounded-md text-center'>
					<strong className='font-bold text-sm sm:text-base'>
						The room has been destroyed.
					</strong>
					<p className='text-xs sm:text-sm mt-1'>
						All messages have been permanently deleted.
					</p>
				</div>
			)}
			{error === 'room-not-found' && (
				<div className='bg-red-900 text-red-100 p-3 sm:p-4 rounded-md text-center'>
					<strong className='font-bold text-sm sm:text-base'>
						Room Not Found
					</strong>
					<p className='text-xs sm:text-sm mt-1'>
						The room you are trying to access does not exist or has been
						destroyed.
					</p>
				</div>
			)}
			{error === 'room-full' && (
				<div className='bg-red-900 text-red-100 p-3 sm:p-4 rounded-md text-center'>
					<strong className='font-bold text-sm sm:text-base'>
						The room is full.
					</strong>
					<p className='text-xs sm:text-sm mt-1'>
						The room you are trying to access has reached its maximum capacity.
					</p>
				</div>
			)}
		</>
	);
};

export default ErrorSection;

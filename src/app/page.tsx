import ErrorSection from '@/components/lobby/error-section';
import IdentitySection from '@/components/lobby/identity-section';
import { RoomErrors } from '@/types/room.types';

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const params = await searchParams;
	const error = (params.error as RoomErrors) || null;
	const wasDestroyed = params.destroyed === 'true';

	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-3 sm:p-4'>
			<div className='w-full max-w-md space-y-6 sm:space-y-8'>
				<ErrorSection error={error} wasDestroyed={wasDestroyed} />

				<div className='text-center space-y-1.5 sm:space-y-2'>
					<h1 className='text-xl sm:text-2xl font-bold tracking-tight text-green-500'>
						{'>'}private_chat
					</h1>
					<p className='text-zinc-500 text-xs sm:text-sm'>
						A private, self-destructing chat room.
					</p>
				</div>
				<IdentitySection />
			</div>
		</main>
	);
}

import { client } from '@/lib/client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useUsername } from './use-username';

export const useLobby = () => {
	const router = useRouter();
	const { username } = useUsername();

	const { mutate: createRoom, isPending } = useMutation({
		mutationFn: async () => await client.rooms.create.post(),
		onSuccess: res => {
			router.push('/room/' + res.data?.roomId);
		},
	});

	return {
		username,
		createRoom,
		isPending,
	};
};

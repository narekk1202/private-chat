import { useUsername } from '@/hooks/use-username';
import { client } from '@/lib/client';
import { useRealtime } from '@/lib/realtime-client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useEffectEvent, useState } from 'react';

export function useRoom(roomId: string) {
	const router = useRouter();
	const { username } = useUsername();
	const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

	const { data: ttlData } = useQuery({
		queryKey: ['ttl', roomId],
		queryFn: async () => {
			return (await client.rooms.ttl.get({ query: { roomId } })).data;
		},
	});

	const { data: messages, refetch } = useQuery({
		queryKey: ['messages', roomId],
		queryFn: async () => {
			return (await client.messages.get({ query: { roomId } })).data;
		},
	});

	const { mutateAsync: sendMessage, isPending: isSending } = useMutation({
		mutationFn: async ({ text }: { text: string }) => {
			await client.messages.post(
				{ sender: username, text },
				{ query: { roomId } }
			);
		},
	});

	const { mutate: destroyRoom } = useMutation({
		mutationFn: async () => {
			await client.rooms.delete(null, { query: { roomId } });
		},
		onSuccess: () => {
			router.push('/?destroyed=true');
		},
	});

	useRealtime({
		channels: [roomId],
		events: ['chat.message', 'chat.destroy'],
		onData: ({ event }) => {
			if (event === 'chat.message') {
				refetch();
			}

			if (event === 'chat.destroy') {
				router.push('/?destroyed=true');
			}
		},
	});

	const setTime = useEffectEvent(() => {
		if (ttlData?.ttl !== undefined) {
			setTimeRemaining(ttlData.ttl);
		}
	});

	useEffect(() => {
		setTime();
	}, [ttlData]);

	useEffect(() => {
		if (timeRemaining === null || timeRemaining < 0) return;

		if (timeRemaining === 0) {
			router.push('/?destroyed=true');
			return;
		}

		const interval = setInterval(() => {
			setTimeRemaining(prev => {
				if (prev === null || prev <= 1) {
					clearInterval(interval);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [timeRemaining, router]);

	return {
		username,
		messages: messages?.messages || [],
		timeRemaining,
		sendMessage,
		isSending,
		destroyRoom,
	};
}

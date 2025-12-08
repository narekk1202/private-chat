'use client';

import { Message } from '@/lib/realtime';
import { format } from 'date-fns';

interface MessageListProps {
	messages: Message[];
	username: string;
}

export function MessageList({ messages, username }: MessageListProps) {
	if (messages.length === 0) {
		return (
			<div className='flex-1 flex items-center justify-center h-full'>
				<p className='text-zinc-600 text-sm font-mono'>
					No messages yet, start the conversation.
				</p>
			</div>
		);
	}

	return (
		<div className='flex-1 overflow-auto p-4 space-y-4 scrollbar-thin'>
			{messages.map(message => (
				<div key={message.id} className='flex flex-col items-start'>
					<div className='max-w-[80%] group'>
						<div className='flex items-baseline gap-3 mb-1'>
							<span
								className={`text-xs font-bold ${
									message.sender === username
										? 'text-green-500'
										: 'text-blue-500'
								}`}
							>
								{message.sender === username ? 'You' : message.sender}
							</span>
							<span className='text-[10px] text-zinc-600'>
								{format(message.timestamp, 'HH:mm:ss')}
							</span>
						</div>
						<p className='text-sm text-zinc-300 leading-relaxed break-all'>
							{message.text}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

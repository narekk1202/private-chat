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
				<p className='text-zinc-600 text-sm font-mono text-center'>
					No messages yet, start the conversation.
				</p>
			</div>
		);
	}

	return (
		<div className='flex-1 overflow-auto p-3 sm:p-4 space-y-3 sm:space-y-4 scrollbar-thin'>
			{messages.map(message => (
				<div key={message.id} className='flex flex-col items-start'>
					<div className='max-w-[90%] sm:max-w-[80%] group'>
						<div className='flex items-baseline gap-2 sm:gap-3 mb-1'>
							<span
								className={`text-[11px] sm:text-xs font-bold ${
									message.sender === username
										? 'text-green-500'
										: 'text-blue-500'
								}`}
							>
								{message.sender === username ? 'You' : message.sender}
							</span>
							<span className='text-[9px] sm:text-[10px] text-zinc-600'>
								{format(message.timestamp, 'HH:mm:ss')}
							</span>
						</div>
						<p className='text-[13px] sm:text-sm text-zinc-300 leading-relaxed break-all'>
							{message.text}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

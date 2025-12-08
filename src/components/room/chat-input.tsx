'use client';

import { useRef, useState } from 'react';

interface ChatInputProps {
	onSend: (text: string) => Promise<void> | void;
	isPending: boolean;
}

export function ChatInput({ onSend, isPending }: ChatInputProps) {
	const [input, setInput] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSend = async () => {
		if (!input.trim()) return;
		await onSend(input);
		setInput('');
		inputRef.current?.focus();
	};

	return (
		<div className='p-3 sm:p-4 border-t border-zinc-800 bg-zinc-900/30'>
			<div className='flex gap-2 sm:gap-4'>
				<div className='flex-1 relative group'>
					<span className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-green-500 animate-pulse text-sm sm:text-base'>
						{'>'}
					</span>
					<input
						ref={inputRef}
						value={input}
						onChange={e => setInput(e.target.value)}
						onKeyDown={e => {
							if (e.key === 'Enter' && input.trim()) handleSend();
						}}
						placeholder='Type your message...'
						autoFocus
						type='text'
						className='w-full bg-black border-zinc-800 focus:border-zinc-700 focus:outline-none transition-colors text-zinc-100 placeholder:text-zinc-700 py-2.5 sm:py-3 pl-7 sm:pl-8 pr-3 sm:pr-4 text-sm'
					/>
				</div>

				<button
					onClick={handleSend}
					disabled={!input.trim() || isPending}
					className='bg-zinc-800 text-zinc-400 px-4 sm:px-6 text-xs sm:text-sm font-bold hover:text-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
				>
					SEND
				</button>
			</div>
		</div>
	);
}

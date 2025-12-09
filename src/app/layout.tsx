import { Providers } from '@/components/providers';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
	title: 'Private Chat',
	description: 'A secure, real-time private chat application.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${jetbrainsMono.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Diamond Shop',
	description: 'online shop, diamond shop, phone, watch, laptop',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className='dark bg-primary'>
			<Head>
				<link rel='icon' href='/images/site/logo.png' />
			</Head>
			<body className={inter.className}>
				<Providers>
					<Toaster position="top-center" toastOptions={{duration: 5000}} />
					{children}
				</Providers>
			</body>
		</html>
	);
}

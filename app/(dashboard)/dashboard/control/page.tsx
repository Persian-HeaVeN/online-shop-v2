'use client';
import { Image } from '@nextui-org/react';
import Link from 'next/link';

export default function DashboardControlPage() {
	return (
		<main className='flex ps-14 w-full'>
			<div className='flex flex-col gap-1'>
				<Image
					width={200}
					src='/images/profile/1.png'
					radius='full'
					className='py-1 min-w-[200px] select-none bg-gray-400 border-white border-4'
				/>
				<Link
					href={'/dashboard/control/profile'}
					className='hover:underline text-secondary text-center w-fit self-center cursor-pointer'
				>
					edit
				</Link>
			</div>
			<div className='flex flex-col gap-1 ms-8 text-gray-400 text-xl'>
				<h1 className='text-4xl text-white'>Username</h1>
				<p className='mt-12'>
					<span className='text-white'>Your Wallet</span>: 0$
				</p>
				<p>
					<span className='text-white'>Email:</span> example@mail.com
				</p>
				<p className='line-clamp-2'>
					<span className='text-white'>Address:</span> Iran, Gorgan,
					Nahar Khoran, Edalat 98/1, Aryan Apartment
				</p>
			</div>
		</main>
	);
}

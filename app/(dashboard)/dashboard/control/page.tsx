'use client';
import { Image } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardControlPage() {
	const { data: session } = useSession();
	const profileImageSrc = session?.user?.siteinfo?.profile
		? `/images/profile/${session.user.siteinfo.profile}.png`
		: '/images/profile/0.png';
	return (
		<main className='flex ps-14 w-full'>
			<div className='flex flex-col gap-1'>
				<Image
					width={200}
					src={profileImageSrc}
					radius='full'
					className='profile-image'
				/>
				<Link
					href={'/dashboard/control/profile'}
					className='hover:underline text-secondary text-center w-fit self-center cursor-pointer'
				>
					edit
				</Link>
			</div>
			<div className='flex flex-col gap-1 ms-8 pt-2 text-gray-400 text-xl'>
				<h1 className='text-4xl text-white'>
					{session?.user?.name || 'Username'}
				</h1>
				<p className='mt-8'>
					<span className='text-white'>Wallet Balance</span>: 0$
				</p>
				<p>
					<span className='text-white'>Email:</span> {session?.user?.email || "example@mail.com"}
				</p>
				<p className='line-clamp-2'>
					<span className='text-white'>Address:</span> Iran, Gorgan,
					Nahar Khoran, Edalat 98/1, Aryan Apartment
				</p>
			</div>
		</main>
	);
}

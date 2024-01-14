'use client';
import ProductsDropDown from './ProductsDropDown';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/framerTransitions';
import { Image } from '@nextui-org/react';
import UserDropDown from './UserDropDown';
import SearchModal from './SearchComponent';

export default function Navbar() {
	const router = useRouter();
	const { data: session } = useSession();

	return (
		<motion.div initial='initial' animate='animate' variants={fadeInUp}>
			<nav className='flex items-center navbar-shadow w-full border-1.5 rounded-2xl px-2 shadow-lg mb-6'>
				<div className='flex gap-2 justify-start items-center ps-2 w-1/3'>
					<ProductsDropDown />
					<SearchModal />
				</div>
				<div className='flex gap-2 justify-center w-1/3 items-center text-xl select-none'>
					<p className='show-in lg'>Diamond</p>
					<Image
						onClick={(e) => router.push('/')}
						width={65}
						src='/icon.png'
						className='py-1 cursor-pointer'
					/>
					<p className='show-in lg'>Shop</p>
				</div>
				<div className='flex justify-end items-center w-1/3 gap-2 pe-2'>
					{session?.user?.name}
					<UserDropDown />
				</div>
			</nav>
		</motion.div>
	);
}

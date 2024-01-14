'use client';

import { DiamondRounded } from '@mui/icons-material';
import Link from 'next/link';
import AnimatedComponent from './AnimatedComponents';
import { fadeInRight } from '@/lib/framerTransitions';

export default function EntryDiamondLogo() {
	return (
		<AnimatedComponent
			classname={'flex items-center justify-center mt-6 sm:mt-0 w-full sm:w-1/3'}
			animation={fadeInRight}
		>
			<div className='flex sm:items-center shadow-white shadow-xl rounded-3xl h-[125%] sm:h-full'>
				<Link href='/'>
					<DiamondRounded
						className='text-secondary hover:text-white transition-1s hover:cursor-pointer'
						style={{ fontSize: '20rem' }}
					/>
				</Link>
			</div>
		</AnimatedComponent>
	);
}

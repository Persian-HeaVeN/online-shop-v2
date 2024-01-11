'use client';

import { AccountCircle as UserIcon } from '@mui/icons-material';
import AnimatedComponent from './AnimatedComponents';
import { iphoneAnimation } from '@/lib/framerTransitions';

export default function CommentCard({ comment }: any) {
	const nowComment = JSON.parse(comment);

	return (
		<AnimatedComponent animation={iphoneAnimation}>
			<div className='flex w-full min-h-fit border-2 rounded-xl p-2 select-none transition-all hover:border-secondary'>
				<div className='me-2'>
					<UserIcon className='text-[2.5rem] text-white' />
				</div>
				<div className='flex flex-col w-full'>
					<p className='font-semibold tracking-widest text-gray-300'>
						{nowComment.username}
					</p>
					<p>{nowComment.comment}</p>
				</div>
			</div>
		</AnimatedComponent>
	);
}

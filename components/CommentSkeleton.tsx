'use client';
import { Skeleton } from '@nextui-org/react';

export default function CommentSkeleton() {
	return (
		<div className='flex w-full min-h-fit border-gray-600 border-2 rounded-xl p-2 select-none transition-all hover:border-secondary'>
			<div className='me-2'>
				<Skeleton className='w-[2.5rem] rounded-lg mt-2'>
					<div className='h-9 w-full rounded-lg bg-secondary-200'></div>
				</Skeleton>
			</div>
			<div className='flex flex-col w-full'>
				<Skeleton className='w-2/12 rounded-lg mt-2'>
					<div className='h-4 w-full rounded-lg bg-secondary-200'></div>
				</Skeleton>
				<Skeleton className='w-4/12 rounded-lg mt-2'>
					<div className='h-4 w-full rounded-lg bg-secondary-200'></div>
				</Skeleton>
				<Skeleton className='w-8/12 rounded-lg mt-2'>
					<div className='h-4 w-full rounded-lg bg-secondary-200'></div>
				</Skeleton>
			</div>
		</div>
	);
}

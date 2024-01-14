'use client';
import { Skeleton } from '@nextui-org/react';

export default function CardSkeleton() {

	return (
		<div className='card'>
			<div className='card-inner'>
				<div className='top'>
					<Skeleton className='w-4/5 rounded-lg mt-2'>
						<div className='h-28 w-full rounded-lg bg-secondary-200'></div>
					</Skeleton>
				</div>
				<div className='bottom'>
					<Skeleton className='w-4/5 rounded-lg'>
						<div className='h-4 w-full rounded-lg bg-secondary-200'></div>
					</Skeleton>

					<Skeleton className='w-2/5 rounded-lg'>
						<div className='h-4 w-full rounded-lg bg-secondary-200'></div>
					</Skeleton>

					<Skeleton className='w-1/5 rounded-lg'>
						<div className='h-4 w-full rounded-lg bg-secondary-200'></div>
					</Skeleton>

					<Skeleton className='w-3/5 rounded-lg mb-2'>
						<div className='h-4 w-full rounded-lg bg-secondary-200'></div>
					</Skeleton>
				</div>
			</div>
		</div>
	);
}

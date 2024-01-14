'use client';

import AnimatedComponent from '@/components/AnimatedComponents';
import Card from '@/components/Card';
import CardSkeleton from '@/components/CardSkeleton';
import { getServerCart } from '@/lib/ServerFunctions';
import { fadeInLeft } from '@/lib/framerTransitions';
import { CloseRounded } from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function CartPage() {
	const [products, setProducts] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { data: session } = useSession();

	useEffect(() => {
		async function getCart(email: string) {
			const serverCart = await getServerCart(email);
			setProducts(serverCart);
			setIsLoading(false);
		}
		getCart(session?.user?.email as string);
	}, [products]);

	return (
		<main>
			<AnimatedComponent animation={fadeInLeft}>
				<h1 className='text-center text-2xl font-semibold tracking-wider mb-4'>
					Your Cart:
				</h1>
			</AnimatedComponent>
			{products.length > 0 ? (
				<div className='card-list four'>
					{products.map((item: any, index: number) => (
						<Card
							key={index}
							colors={item['selectedColor']}
							off={Number(item['off'])}
							imagePath={`/images/products${item['image']}`}
							name={item['brand'] + ' ' + item['model']}
							price={item['price']}
							id={item['id']}
						/>
					))}
				</div>
			) : (
				<div className='card-list three'>
					{[1, 2, 3, 4, 5, 6].map((n) => (
						<CardSkeleton key={n} />
					))}
				</div>
			)}
			{isLoading === false && products.length === 0 && (
				<div className='flex flex-col items-center justify-center w-full min-h-[63vh]'>
					<CloseRounded style={{ fontSize: '10rem' }} />
					<h1 className='text-white text-center'>
						You Have not Added a Product to Your Cart yet !
					</h1>
				</div>
			)}
		</main>
	);
}

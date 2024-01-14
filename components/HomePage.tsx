'use client';
import { useRouter } from 'next/navigation';
import Card from './Card';
import { PercentRounded as PercentIcon } from '@mui/icons-material';
import { ServerProducts } from '@/lib/ServerFunctions';
import { useEffect, useState } from 'react';
import { fadeInRight } from '@/lib/framerTransitions';
import AnimatedComponent from './AnimatedComponents';

export default function HomePage() {
	const router = useRouter();
	const [products, setProducts] = useState<any>({});

	useEffect(() => {
		async function getProducts() {
			const appleWatches = await ServerProducts(
				'brand=apple&category=watch&limit=2'
			);
			const laptops = await ServerProducts('category=laptop&limit=4');
			setProducts({
				...products,
				appleWatches: appleWatches,
				laptops: laptops,
			});
		}
		getProducts();
	}, []);

	return (
		<main className='flex flex-col w-full'>
			<AnimatedComponent animation={fadeInRight}>
				<div
					onClick={() => router.push('/products?off=true')}
					className='card big'
				>
					<div className='max-md:flex hidden justify-center card-inner secondary items-center p-4'>
						<div className='flex justify-center text-center items-center'>
							<div className='float-left'>
								<PercentIcon
									style={{ fontSize: '3rem' }}
									className='text-secondary'
								/>
							</div>
							<strong className='text-2xl text-secondary'>
								Explore Special Offers Today
							</strong>
							<div className='float-right'>
								<PercentIcon
									style={{ fontSize: '3rem' }}
									className='text-secondary'
								/>
							</div>
						</div>
					</div>
					<div className='flex justify-center show-in md card-inner secondary items-center px-4 py-1'>
						<div className='flex justify-center text-center items-center'>
							<div className='float-left'>
								<PercentIcon
									style={{ fontSize: '10rem' }}
									className='text-secondary'
								/>
							</div>
							<strong className='text-7xl text-secondary'>
								Explore Special Offers Today
							</strong>
							<div className='float-right'>
								<PercentIcon
									style={{ fontSize: '10rem' }}
									className='text-secondary'
								/>
							</div>
						</div>
					</div>
				</div>
				<h1 className='text-center text-2xl font-semibold text-white my-5'>
					Looking For Apple Watch ?
				</h1>
			</AnimatedComponent>

			<div className='card-list two'>
				{products.appleWatches &&
					Object.keys(products.appleWatches).map((key: any) => {
						return (
							<Card
								key={key}
								colors={products.appleWatches[key]['colors']}
								off={products.appleWatches[key]['off']}
								imagePath={`/images/products${products.appleWatches[key]['image']}`}
								name={products.appleWatches[key]['name']}
								price={products.appleWatches[key]['price']}
								id={products.appleWatches[key]['id']}
							/>
						);
					})}
			</div>

			<AnimatedComponent animation={fadeInRight}>
				<h1 className='text-center text-2xl font-semibold text-white my-6'>
					Or a Laptop ?!
				</h1>
			</AnimatedComponent>

			<div className='card-list four'>
				{products.laptops &&
					Object.keys(products.laptops).map((key: any) => {
						return (
							<Card
								key={key}
								colors={products.laptops[key]['colors']}
								off={products.laptops[key]['off']}
								imagePath={`/images/products${products.laptops[key]['image']}`}
								name={products.laptops[key]['name']}
								price={products.laptops[key]['price']}
								id={products.laptops[key]['id']}
							/>
						);
					})}
			</div>
		</main>
	);
}

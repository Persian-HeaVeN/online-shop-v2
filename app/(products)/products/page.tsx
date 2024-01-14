'use client';

import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import { ServerProducts } from '@/lib/ServerFunctions';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { iphoneAnimation } from '@/lib/framerTransitions';
import { useSearchParams } from 'next/navigation';
import { filterParams } from '@/lib/filterParams';
import { CloseRounded as CloseIcon } from '@mui/icons-material';

export default function ProductsPage() {
	const [products, setProducts] = useState<any[]>([]);
	const params = useSearchParams();

	let addedFilters = '';

	filterParams.forEach((filter: string) => {
		if (params.get(filter)) {
			addedFilters += `${filter}=${params.get(filter)}&`;
		}
	});

	addedFilters = addedFilters.slice(0, -1);

	useEffect(() => {
		async function getProducts() {
			const products = await ServerProducts(addedFilters);
			setProducts(products);
		}
		getProducts();
	}, [addedFilters]);

	return (
		<>
			<Navbar />
			<motion.div
				initial='initial'
				animate='animate'
				variants={iphoneAnimation}
			>
				<h1 className='text-center mb-4 text-2xl font-bold'>
					Result Products
				</h1>
			</motion.div>
			<main className='card-list four'>
				{products.length > 0 &&
					Object.keys(products).map((key: any) => {
						return (
							<Card
								key={key}
								colors={products[key]['colors']}
								off={Number(products[key]['off'])}
								imagePath={`/images/products${products[key]['image']}`}
								name={
									products[key]['brand'] +
									' ' +
									products[key]['model']
								}
								price={products[key]['price']}
								id={products[key]['id']}
							/>
						);
					})}
			</main>
			{products.length === 0 && (
				<div className='flex flex-col justify-center items-center w-full h-[63vh]'>
					<CloseIcon style={{fontSize:"10rem"}} />
					<p className='text-center'>No Product Found</p>
				</div>
			)}
		</>
	);
}

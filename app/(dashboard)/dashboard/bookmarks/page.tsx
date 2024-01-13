'use client';

import AnimatedComponent from '@/components/AnimatedComponents';
import Card from '@/components/Card';
import { getServerBookMarks } from '@/lib/ServerFunctions';
import { fadeInLeft } from '@/lib/framerTransitions';
import { CloseRounded } from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
	const [products, setProducts] = useState<any[]>([]);
	const { data: session } = useSession();

	useEffect(() => {
		async function getBookMarks(email: string) {
			const serverBookMarks = await getServerBookMarks(email);
			setProducts(serverBookMarks);
		}
		getBookMarks(session?.user?.email as string);
	}, [products]);

	return (
		<main>
			<AnimatedComponent animation={fadeInLeft}>
				<h1 className='text-center text-2xl font-semibold tracking-wider mb-4'>
					Your BookMarks:
				</h1>
			</AnimatedComponent>
			{products.length > 0 ? (
				<div className='card-list four'>
					{products.map((item: any, index: number) => (
						<Card
							cantBuy={true}
							key={index}
							colors={item['colors']}
							off={Number(item['off'])}
							imagePath={`/images/products${item['image']}`}
							name={item['brand'] + ' ' + item['model']}
							price={item['price']}
							id={item['id']}
						/>
					))}
				</div>
			) : (
				<div className='flex flex-col items-center justify-center w-full min-h-[63vh]'>
					<CloseRounded style={{ fontSize: '10rem' }} />
					<h1 className='text-white text-center'>
						You Dont Have Any Bookmarks !
					</h1>
				</div>
			)}
		</main>
	);
}

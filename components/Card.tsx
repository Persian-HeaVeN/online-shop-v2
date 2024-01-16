'use client';
import {
	VisibilityRounded as EyeIcon,
	BookmarkBorderRounded as NotSavedIcon,
	BookmarkRounded as SavedIcon,
} from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { iphoneAnimation } from '@/lib/framerTransitions';
import AnimatedComponent from './AnimatedComponents';
import { Badge } from '@nextui-org/react';
import { calculateOffPrice } from '@/lib/calculateOff';
import { isFavorite, toggleFavorite } from '@/lib/productFavorite';
import CartControl from './CartControl';

export default function Card(params: any) {
	const { data: session, update } = useSession();
	const router = useRouter();

	const isSaved = isFavorite(Number(params.id), update, session);

	function seeProductFunc() {
		router.push(`/products/${params.id}`);
	}

	function toggleSaveProduct(id: number) {
		if (!session) {
			toast.error('you must login first!');
			return;
		} else {
			toggleFavorite(id, update, session);
		}
	}

	return (
		<AnimatedComponent animation={iphoneAnimation}>
			<Badge
				content={`%${params.off}`}
				size='lg'
				shape='circle'
				color='danger'
				className='top-2 right-2'
				style={{
					display: params.off ? 'block' : 'none',
				}}
			>
				<div className='card' onClick={seeProductFunc}>
					<div className='card-inner'>
						<div className='top'>
							<img src={params.imagePath} alt='product' />
						</div>
						<div className='bottom'>
							<h1 className='line-clamp-1'>{params.name}</h1>
							<p className='flex gap-1 items-center scale-75'>
								{params.colors
									.slice(0, 3)
									.map((color: string, key: number) => (
										<span
											key={key}
											style={{
												backgroundColor: 'transparent',
											}}
											className={`circle`}
										>
											<span
												style={{
													backgroundColor: `${color}`,
												}}
												className='inner-circle'
											/>
										</span>
									))}
							</p>
							<p>
								${calculateOffPrice(params.price, params.off)}
							</p>
							<div className='flex mt-auto justify-center gap-1.5'>
								<span className='mb-2'>
									{isSaved === true ? (
										<SavedIcon
											onClick={() =>
												toggleSaveProduct(
													Number(params.id)
												)
											}
											className='icon-hover text-[1.8rem]'
										/>
									) : (
										<NotSavedIcon
											onClick={() =>
												toggleSaveProduct(
													Number(params.id)
												)
											}
											className='icon-hover text-[1.8rem]'
										/>
									)}
								</span>
								{!params.cantBuy && (
									<span>
										<CartControl
											id={params.id}
											session={session}
											update={update}
											color={params.colors[0]}
										/>
									</span>
								)}
								<span>
									<EyeIcon
										onClick={seeProductFunc}
										className='icon-hover text-[1.8rem]'
									/>
								</span>
							</div>
						</div>
					</div>
				</div>
			</Badge>
		</AnimatedComponent>
	);
}

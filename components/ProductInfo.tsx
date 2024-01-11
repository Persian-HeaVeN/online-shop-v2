'use client';

import { Badge, BreadcrumbItem, Breadcrumbs, Image } from '@nextui-org/react';
import {
	HomeRounded as HomeIcon,
	StorefrontOutlined as ProductIcon,
	Laptop,
	Phone,
	Watch,
	BookmarkBorderRounded as NotSavedIcon,
	BookmarkRounded as SavedIcon,
	ShareRounded as ShareIcon,
	DoneRounded as DoneIcon,
} from '@mui/icons-material';

import AnimatedComponent from './AnimatedComponents';
import {
	fadeInDown,
	fadeInLeft,
	fadeInRight,
	iphoneAnimation,
} from '@/lib/framerTransitions';
import AnimatedWidth from './AnimatedWidth';
import { Component, ComponentElement, useEffect, useState } from 'react';
import { ServerComments, getServerCartWithID } from '@/lib/ServerFunctions';
import CommentsList from './CommentsList';
import { calculateOffPrice } from '@/lib/calculateOff';
import { useSession } from 'next-auth/react';
import { addToCart, removeFromCart } from '@/lib/cartFunctions';
import toast from 'react-hot-toast';

const categoryIcon: any = {
	Laptop: <Laptop />,
	Watch: <Watch />,
	Phone: <Phone />,
};

export default function ProductInfo(params: any) {
	const product = params.product;
	const [pcomments, setPcomments] = useState({});
	const [nowColor, setNowColor] = useState<string>(product.colors[0]);
	const [buttonData, setButtonData] = useState<any>({});
	const { data: session, update } = useSession();

	async function getCartID() {
		const data = await getServerCartWithID(
			session?.user?.email as string,
			product.id
		);
		if (data) {
			const newButtonData: any = {};
			data.forEach((item: any) => {
				newButtonData[item.selectedColor[0]] = item.count;
			});
			setButtonData(newButtonData);
		}
	}

	useEffect(() => {
		async function getProductComments() {
			const productComments = await ServerComments(Number(product.id));
			setPcomments(productComments);
		}
		getProductComments();
	}, []);

	useEffect(() => {
		getCartID();
	}, [session]);

	function colorSelectHandler(color: string) {
		setNowColor(color);
	}

	function addToCartHandler() {
		if (!session) {
			return toast.error("you must loggin first !")
		}
		addToCart(Number(product.id), update, session, nowColor.toString());
	}

	function removeFromCartHandler() {
		removeFromCart(Number(product.id), update, session, nowColor.toString());
	}

	return (
		<main className='hidden lg:flex lg:flex-col'>
			<div className='flex'>
				<div className='flex flex-col w-5/12'>
					<AnimatedWidth>
						<Breadcrumbs
							size='md'
							style={{
								maxHeight: '1.3rem',
								width: 'fit-content',
							}}
						>
							<BreadcrumbItem
								startContent={<HomeIcon />}
								href='/'
							>
								Home
							</BreadcrumbItem>
							<BreadcrumbItem
								startContent={<ProductIcon />}
								href='/products'
							>
								Products
							</BreadcrumbItem>
							<BreadcrumbItem
								startContent={categoryIcon[product.category]}
							>
								{product.category}
							</BreadcrumbItem>
						</Breadcrumbs>
					</AnimatedWidth>

					<div className='flex w-full mt-6'>
						<AnimatedComponent animation={fadeInLeft}>
							<div className='flex flex-col gap-1 w-1/12 items-center pt-8'>
								<NotSavedIcon className='icon-hover text-[2rem]' />
								<ShareIcon className='icon-hover text-[2rem]' />
							</div>
						</AnimatedComponent>
						<div className='flex items-center justify-center w-11/12'>
							<AnimatedComponent animation={fadeInDown}>
								<Badge
									content='New'
									size='lg'
									shape='circle'
									color='danger'
									className='top-2'
									style={{
										display:
											product.new === false
												? 'none'
												: 'block',
									}}
								>
									<Image
										width={340}
										alt='Product Image'
										src={`/images/products/${product.image}`}
									/>
								</Badge>
							</AnimatedComponent>
						</div>
					</div>
				</div>

				<div className='flex flex-col px-5 gap-2 pt-8 w-7/12'>
					<AnimatedComponent animation={fadeInRight}>
						<p className='text-3xl min-h-[4.5rem]'>
							{product.name}
						</p>
					</AnimatedComponent>

					<div className='flex flex-col self-end pe-5'>
						<AnimatedComponent animation={fadeInRight}>
							<div className='flex min-h-[1.75rem]'>
								{Number(product.off) > 0 && (
									<>
										<p className='line-through text-gray-500/80 text-lg font-medium'>
											${product.price}
										</p>
										<p className='bg-red-500 rounded-3xl px-1 ms-2 flex items-center'>
											%{product.off}
										</p>
									</>
								)}
							</div>
						</AnimatedComponent>

						<AnimatedComponent animation={fadeInRight}>
							<p className='text-secondary text-2xl font-bold'>
								${calculateOffPrice(product.price, product.off)}
							</p>
						</AnimatedComponent>
					</div>
					<AnimatedComponent animation={iphoneAnimation}>
						<p>
							<span className='text-gray-400 me-1'>Brand:</span>{' '}
							<strong>{product.brand}</strong>
						</p>
					</AnimatedComponent>
					<AnimatedComponent animation={iphoneAnimation}>
						<p>
							<span className='text-gray-400 me-1'>Model:</span>{' '}
							<strong>{product.model}</strong>
						</p>
					</AnimatedComponent>
					<AnimatedComponent animation={iphoneAnimation}>
						<p>
							<span className='text-gray-400 me-1'>
								Shipping Time:
							</span>{' '}
							<strong>
								{product.send === 0 ? (
									<>today</>
								) : (
									<>{product.send} days</>
								)}
							</strong>
						</p>
					</AnimatedComponent>
					<AnimatedComponent animation={iphoneAnimation}>
						<p className='flex gap-1 text-gray-400 items-center'>
							Colors:
							{product.colors.map(
								(color: string, key: number) => (
									<span
										onClick={() =>
											colorSelectHandler(color)
										}
										key={key}
										style={{
											backgroundColor:
												color === nowColor
													? '#ffffff'
													: 'transparent',
										}}
										className={`circle`}
									>
										<span
											style={{
												backgroundColor: `${color}`,
											}}
											className='inner-circle'
										>
											{color === nowColor && (
												<DoneIcon
													style={{
														fontSize: '1rem',
														color: 'white',
													}}
												/>
											)}
										</span>
									</span>
								)
							)}
						</p>
					</AnimatedComponent>
					<AnimatedComponent animation={fadeInDown}>
						<div
							key={nowColor}
							className='flex flex-col justify-end w-full'
						>
							{Number(buttonData[nowColor]) &&
							Number(buttonData[nowColor]) > 0 ? (
								<div className='flex justify-center gap-3 w-full mt-8'>
									<button onClick={removeFromCartHandler} className='btn btn-primary w-1/3'>Remove</button>
									<p className='text-2xl text-center w-1/3'>{buttonData[nowColor]}</p>
									<button onClick={addToCartHandler} className='btn btn-primary w-1/3'>Add More</button>
								</div>
							) : (
								<button
									onClick={addToCartHandler}
									className='btn btn-primary mt-8'
								>
									Add to Cart
								</button>
							)}
						</div>
					</AnimatedComponent>
				</div>
			</div>
			<AnimatedComponent animation={fadeInLeft}>
				<h1 className='text-2xl my-8'>Comments:</h1>
			</AnimatedComponent>
			<CommentsList comments={pcomments} />
		</main>
	);
}

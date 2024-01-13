'use client';
import {
	Laptop,
	Phone,
	Watch,
	ExpandMoreRounded as MoreIcon,
	Inventory2Rounded as AllIcon,
} from '@mui/icons-material';
import React from 'react';
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function ProductsDropDown(params: any) {
	const router = useRouter();
	const datas = [
		{
			key: 'All',
			logo: <AllIcon />,
			label: 'All Products',
		},
		{
			key: 'Phone',
			logo: <Phone />,
			label: 'Phones',
		},
		{
			key: 'Laptop',
			logo: <Laptop />,
			label: 'Laptops',
		},
		{
			key: 'Watch',
			logo: <Watch />,
			label: 'Watches',
		},
	];

	function navigateTo(category: any) {
		router.refresh();
		if (category === 'All') {
			router.replace(`/products`);
		} else {
			router.replace(`/products?category=${category}`);
		}
	}

	return (
		<>
			<Dropdown>
				<DropdownTrigger>
					<Button
						isIconOnly={
							typeof window !== 'undefined' &&
							window.innerWidth <= 640
								? true
								: false
						}
						className='text-white pr-1.5'
						color='secondary'
						variant='bordered'
					>
						<p className='show-in sm'>
							Products
							<MoreIcon className='text-white' />
						</p>
						{typeof window !== 'undefined' &&
							window.innerWidth <= 640 && (
								<AllIcon className='ms-2' />
							)}
					</Button>
				</DropdownTrigger>
				<DropdownMenu
					onAction={(key) => navigateTo(key)}
					aria-label='Static Actions'
					items={datas}
				>
					{(item) => (
						<DropdownItem
							startContent={item.logo}
							key={item.key}
							color='secondary'
							variant='bordered'
							className={'text-white'}
						>
							{item.label}
						</DropdownItem>
					)}
				</DropdownMenu>
			</Dropdown>
		</>
	);
}

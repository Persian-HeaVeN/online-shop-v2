'use client';
import { Laptop, Phone, Watch } from '@mui/icons-material';
import React from 'react';
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
} from '@nextui-org/react';

export default function ProductsDropDown(params: any) {
	const datas = [
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

	return (
		<>
			<Dropdown>
				<DropdownTrigger>
					<Button
						className='text-white'
						color='secondary'
						variant='bordered'
					>
						Products
					</Button>
				</DropdownTrigger>
				<DropdownMenu
					onAction={(key) => alert(key)}
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

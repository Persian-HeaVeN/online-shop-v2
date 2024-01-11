'use client';
import {
	ShoppingCartOutlined as CartIcon,
	BookmarksRounded as FavoriteIcon,
	PersonOutline as UserIcon,
	GridViewRounded as DashboardIcon,
	LogoutRounded as LogoutIcon,
	LoginRounded as LoginIcon,
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
import { signOut, useSession } from 'next-auth/react';

export default function UserDropDown() {
	const router = useRouter();
	const { data: session } = useSession();
	const loggedInButtons = [
		{
			key: 'dashboard',
			logo: <DashboardIcon />,
			label: 'Dashboard',
			color: 'default',
			text: '',
		},
		{
			key: 'dashboard/cart',
			logo: <CartIcon />,
			label: 'My Cart',
			color: 'default',
			text: '',
		},
		{
			key: 'dashboard/bookmarks',
			logo: <FavoriteIcon />,
			label: 'Bookmarks',
			color: 'default',
			text: '',
		},
		{
			key: 'logout',
			logo: <LogoutIcon />,
			label: 'Log out',
			color: 'danger',
			text: 'text-danger',
		},
	];

	const GuestInButtons = [
		{
			key: 'entry',
			logo: <LoginIcon />,
			label: 'Login / Sign Up',
			color: 'secondary',
			text: '',
		},
	];

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button isIconOnly variant='light'>
					<UserIcon
						style={{ fontSize: '2rem' }}
						className='text-white icon-hover'
					/>
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				onAction={(key) => {
					if (key === 'logout') {
						signOut();
					} else {
						router.push(`/${key}`);
					}
				}}
				aria-label='User Actions'
				items={session ? loggedInButtons : GuestInButtons}
			>
				{(item) => (
					<DropdownItem
						startContent={item.logo}
						key={item.key}
						color={item.color ? item.color as "default" | "danger" | "secondary" | "primary" | "success" | "warning" | undefined : 'default' }
						variant='bordered'
						className={item.text ? item.text : 'text-white'}
					>
						{item.label}
					</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	);
}

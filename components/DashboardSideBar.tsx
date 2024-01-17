'use client';
import Link from 'next/link';
import AnimatedComponent from './AnimatedComponents';
import { fadeInLeft } from '@/lib/framerTransitions';
import {
	AccountBoxRounded as PersonalIcon,
	AccountBalanceWalletRounded as WalletIcon,
	LockRounded as SecurityIcon,
	HomeRounded as AdressIcon,
	SentimentSatisfiedAltRounded as ProfileIcon,
	PersonRounded as MainIcon,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';

export default function DashboardSideBar() {
	const pathname = usePathname();
	const sideItems = [
		{
			text: 'Main',
			link: '/dashboard/control',
			icon: <MainIcon />,
		},
		{
			text: 'Profile',
			link: '/dashboard/control/profile',
			icon: <ProfileIcon />,
		},
		{
			text: 'Wallet',
			link: '/dashboard/control/wallet',
			icon: <WalletIcon />,
		},
		{
			text: 'Security',
			link: '/dashboard/control/security',
			icon: <SecurityIcon />,
		},
		{
			text: 'Addresses',
			link: '/dashboard/control/address',
			icon: <AdressIcon />,
		},
		{
			text: 'Personal infos',
			link: '/dashboard/control/personalinfo',
			icon: <PersonalIcon />,
		},
	];
	return (
		<AnimatedComponent classname={'w-full h-full'} animation={fadeInLeft}>
			<div className='flex flex-col items-center gap-2 px-2.5 pt-3 w-full h-full bars-shadow border-1.5 rounded-2xl'>
				{sideItems.map((item, index) => (
					<Link
						key={index}
						href={item.link}
						className={`side-item ${
							item.link === pathname ? 'bg-slate-600' : ''
						}`}
					>
						{item.icon} <p>{item.text}</p>
					</Link>
				))}
			</div>
		</AnimatedComponent>
	);
}

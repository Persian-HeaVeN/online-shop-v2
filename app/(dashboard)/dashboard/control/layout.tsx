import DashboardSideBar from '@/components/DashboardSideBar';
import { ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
	return (
		<>
			<div className='flex w-full min-h-[72vh]'>
				<div className='w-2/12'>
					<DashboardSideBar />
				</div>
				<div className='w-10/12'>{children}</div>
			</div>
		</>
	);
}

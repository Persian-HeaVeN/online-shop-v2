import Navbar from '@/components/Navbar';
import { ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
	return <>
    <Navbar />
    {children}
    </>;
}

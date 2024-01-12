'use server'
import EntryForm from '@/components/EntryForm';
import { redirect } from 'next/navigation';
import { connectMongoDB } from '@/lib/mongodb';
import { getServerAuth } from '@/lib/authOptions';
import EntryDiamondLogo from '@/components/EntryDiamondLogo';

export default async function EntryPage() {
	await connectMongoDB();
	const session = await getServerAuth();
	if (session) {
		return redirect('/dashboard');
	}

	return (
		<main className='flex w-full h-[88.3vh]'>
			<div className='flex items-center w-2/3'>
				<EntryForm />
			</div>
			<EntryDiamondLogo />
		</main>
	);
}

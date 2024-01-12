import { connectMongoDB } from '@/lib/mongodb';
import Account from '@/models/accounts';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	await connectMongoDB();
	const params = req.nextUrl.searchParams as any;
	if (
		!params.get('apikey') ||
		params.get('apikey').toString() !== process.env.SITE_API_KEY?.toString()
	) {
		return NextResponse.json(
			{ message: 'Invalid Api-Key' },
			{ status: 500 }
		);
	}
	const { email } = await req.json();

	console.log(email);
	
	try {
		const exist = await Account.findOne({ email });

		if (exist) {
			return NextResponse.json({ exist: true }, { status: 200 });
		} else {
			return NextResponse.json({ exist: false }, { status: 200 });
		}
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

import { connectMongoDB } from '@/lib/mongodb';
import Account from '@/models/accounts';
import bycrypt from 'bcryptjs';
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

	const { name, password, email } = await req.json();

	const hashedPassword = await bycrypt.hash(password, 10);

	try {
		const exist = await Account.findOne({ email: email });
		if (exist) {
			return NextResponse.json(
				{ message: 'Email Already Exist' },
				{ status: 500 }
			);
		}
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}

	try {
		const newAccount = await Account.create({
			name,
			password: hashedPassword,
			email,
		});

		if (newAccount) {
			return NextResponse.json(
				{ message: 'Account Created Successfully' },
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{ message: 'An error Occurred when Creating Account' },
				{ status: 500 }
			);
		}
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

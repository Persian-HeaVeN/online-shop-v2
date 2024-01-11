import { connectMongoDB } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	await connectMongoDB();
	const params = request.nextUrl.searchParams as any;
	if ( !params.get("apikey") || params.get("apikey").toString() !== process.env.SITE_API_KEY?.toString() ) {
		return NextResponse.json({ message: "Invalid Api-Key" }, { status: 500 });
	}
	try {
		const body = await request.json();
		const { email, subject, html } = body;

		const res = await fetch('https://api.brevo.com/v3/smtp/email', {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'api-key': process.env.BREVO_API_KEY as string,
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				sender: {
					email: 'diamondshop@shayanlotfi.site',
					name: 'Diamond Shop',
				},
				to: [{ email: email }],
				subject: subject,
				htmlContent: html,
			}),
		});

		if (res.ok) {
			return NextResponse.json(
				{ message: 'Email Successfully Sent !' },
				{ status: 201 }
			);
		} else {
			return NextResponse.json(
				{ message: 'Error While Sending Email !' },
				{ status: 500 }
			);
		}
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

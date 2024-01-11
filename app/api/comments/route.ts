import { connectMongoDB } from '@/lib/mongodb';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET(request: NextRequest) {
	try {
		await connectMongoDB();
		const params = request.nextUrl.searchParams as any;
		if (
			!params.get('apikey') ||
			params.get('apikey').toString() !==
				process.env.SITE_API_KEY?.toString()
		) {
			return NextResponse.json(
				{ message: 'Invalid Api-Key' },
				{ status: 500 }
			);
		}

        if (!params.get("id")) {
            return NextResponse.json(
				{ message: 'Invalid Product ID' },
				{ status: 500 }
			);
        }

		const dbPath = path.join(process.cwd(), 'data', 'db.json');
		const datas = fs.readFileSync(dbPath);
		const comments = JSON.parse(datas.toString()).comments;

		const filteredComments: any = [];
        
        const productID = params.get("id");

		comments.forEach((comment: any) => {
            if (Number(comment.productID) === Number(productID)) {
                filteredComments.push(comment)
            }
        });

		return NextResponse.json(filteredComments, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

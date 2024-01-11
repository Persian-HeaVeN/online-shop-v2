import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { filterParams } from '@/lib/filterParams';
import { connectMongoDB } from '@/lib/mongodb';


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
		const dbPath = path.join(process.cwd(), 'data', 'db.json');
		const datas = fs.readFileSync(dbPath);
		const products = JSON.parse(datas.toString()).products;

		let filteredproducts: any = [];

		products.forEach((product: any) => {
			let match = true;

			filterParams.forEach((filter: string) => {
				if (filter === 'price') {
					if (
						params.get(filter) &&
						Number(product[filter]) > params.get(filter)
					) {
						match = false;
					}
				} else if (filter === 'off') {
					if (
						params.get(filter) &&
						Number(product[filter]) === 0
					) {
						match = false;
					}
				} else {
					if (
						params.get(filter) &&
						product[filter].toString().toLowerCase() !==
							params.get(filter).toString().toLowerCase()
					) {
						match = false;
					}
				}
			});
			if (match === true) {
				filteredproducts.push(product);
			}
		});
		if (params.get('limit')) {
			filteredproducts = filteredproducts.slice(
				0,
				Number(params.get('limit'))
			);
		}
		return NextResponse.json(filteredproducts, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

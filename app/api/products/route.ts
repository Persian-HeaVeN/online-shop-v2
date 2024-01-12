import { NextRequest, NextResponse } from 'next/server';
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

		const res = await fetch(
			'https://projects-datas.onrender.com/online_shop_v2',
			{
				method: 'GET',
				headers: {
					'content-type': 'application/json',
				},
				next: {
					revalidate: 60 * 60,
				},
			}
		);

		let products = await res.json();

		products = products.products

		let filteredproducts: any = [];

		if (Object.keys(products).length > 0) {
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
		}

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

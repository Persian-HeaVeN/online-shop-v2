import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
	try {
		const dbPath = path.join(process.cwd(), 'data', 'products.json');
		const datas = fs.readFileSync(dbPath);
		const products = JSON.parse(datas.toString()).products;
		return NextResponse.json( products, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

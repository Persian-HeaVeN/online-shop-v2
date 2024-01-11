'use server';

import Account from '@/models/accounts';

export async function ServerExist(email: string) {
	const res = await fetch(
		process.env.NEXTAUTH_URL +
			'/api/user/exist?apikey=' +
			process.env.SITE_API_KEY,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
			}),
			next: {
				revalidate: 0,
			},
		}
	);

	return res.json();
}

export async function ServerRegister(
	name: string,
	password: string,
	email: string
) {
	const res = await fetch(
		process.env.NEXTAUTH_URL +
			'/api/user/create?apikey=' +
			process.env.SITE_API_KEY,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name,
				password: password,
				email: email,
			}),
			next: {
				revalidate: 0,
			},
		}
	);

	const data = await res.json();

	if (res.ok) {
		return { status: true };
	} else {
		return { status: false, message: data.message };
	}
}

export async function ServerProducts(filters: string, single = false) {
	const res = await fetch(
		process.env.NEXTAUTH_URL +
			'/api/products?apikey=' +
			process.env.SITE_API_KEY +
			'&' +
			filters,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			next: {
				revalidate: 0,
			},
		}
	);
	let data = await res.json();

	if (data.length === 1 && single === true) {
		return data[0];
	}

	return data;
}

export async function ServerComments(productID: number) {
	const res = await fetch(
		process.env.NEXTAUTH_URL +
			'/api/comments?apikey=' +
			process.env.SITE_API_KEY +
			'&id=' +
			productID,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			next: {
				revalidate: 0,
			},
		}
	);
	const data = await res.json();

	return data;
}

export async function getServerBookMarks(email: string) {
	const exist = await Account.findOne({ email });
	if (exist) {
		const bookMarkProducts: any = await Promise.all(
			exist.favorites.map(async (id: number) => {
				const theProduct = await ServerProducts(`id=${id}`, true);
				return theProduct;
			})
		);
		return bookMarkProducts;
	} else {
		return false;
	}
}

export async function getServerCart(email: string) {
	const exist = await Account.findOne({ email });
	if (exist) {
		const cartProducts: any = await Promise.all(
			exist.cart.map(async (product: any) => {
				const theProduct = await ServerProducts(
					`id=${product.id}`,
					true
				);
				return { ...theProduct, selectedColor: [product.color] };
			})
		);
		return cartProducts;
	} else {
		return false;
	}
}

export async function getServerCartWithID(email: string, id: number) {
	const exist = await Account.findOne({ email });
	if (exist) {
		const cartProducts: any = await Promise.all(
			exist.cart.map(async (product: any) => {
				if (product.id === id) {
					const theProduct = await ServerProducts(
						`id=${product.id}`,
						true
					);
					return { ...theProduct, selectedColor: [product.color], count: product.count };
				}
			})
		);
		return cartProducts;
	} else {
		return false;
	}
}

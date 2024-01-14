'use server';

import Account from '@/models/accounts';
import { filterParams } from '@/lib/filterParams';
import bycrypt from 'bcryptjs';
import { connectMongoDB } from './mongodb';
import { calculateOffPrice } from './calculateOff';
import { stringSimilarity } from 'string-similarity-js';

function parseQueryString(
	query: string
): Record<string, string | number | boolean> {
	const result: Record<string, string | number | boolean> = {};

	query.split('&').forEach((pair) => {
		const [key, value] = pair.split('=');
		if (value === 'true') {
			result[key] = true;
		} else if (value === 'false') {
			result[key] = false;
		} else if (!isNaN(Number(value))) {
			result[key] = Number(value);
		} else {
			result[key] = value;
		}
	});

	return result;
}

export async function ServerExist(email: string) {
	/* const res = await fetch(
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

	return res.json(); */

	await connectMongoDB();

	try {
		const exist = await Account.findOne({ email });

		if (exist) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
}

export async function ServerRegister(
	name: string,
	password: string,
	email: string
) {
	/* const res = await fetch(
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
	); */

	await connectMongoDB();

	const hashedPassword = await bycrypt.hash(password, 10);

	try {
		const exist = await Account.findOne({ email: email });
		if (exist) {
			return { message: 'Email Already Exist', status: false };
		}
	} catch (error: any) {
		return { message: error.message, status: false };
	}

	try {
		const newAccount = await Account.create({
			name,
			password: hashedPassword,
			email,
		});

		if (newAccount) {
			return { message: 'Account Created Successfully', status: true };
		} else {
			return {
				message: 'An error Occurred when Creating Account',
				status: false,
			};
		}
	} catch (error: any) {
		return { message: error.message, status: false };
	}
}

export async function ServerProducts(filters: string, single = false) {
	/* const res = await fetch(
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
	); */

	try {
		await connectMongoDB();

		const res = await fetch(
			'https://projects-datas.onrender.com/online_shop_v2',
			{
				method: 'GET',
				headers: {
					'content-type': 'application/json',
				},
				next: {
					revalidate: 60 * 60 * 24,
				},
			}
		);

		let products = await res.json();

		products = products.products;

		let filteredproducts: any = [];

		const filtersArray = parseQueryString(filters);

		if (Object.keys(products).length > 0) {
			products.forEach((product: any) => {
				let match = true;

				filterParams.forEach((filter: string) => {
					if (filter === 'text' && filtersArray[filter]) {
						filtersArray[filter] = filtersArray[filter]
							.toString()
							.replace(/-/g, ' ');

						console.log(
							filtersArray[filter] + `, ${product['name']}`
						);

						if (
							stringSimilarity(
								filtersArray[filter] as string,
								product['name'],
								2,
								false
							) < 0.5
						) {
							if (
								stringSimilarity(
									filtersArray[filter] as string,
									product['model'],
									2,
									false
								) < 0.5
							) {
								if (
									stringSimilarity(
										filtersArray[filter] as string,
										product['brand'],
										2,
										false
									) < 0.5
								) {
									if (
										stringSimilarity(
											filtersArray[filter] as string,
											product['category'],
											2,
											false
										) < 0.5
									) {
										match = false;
									}
								}
							}
						}
					} else if (filter === 'price' && filtersArray[filter]) {
						const priceFilter = filtersArray[filter]
							.toString()
							.split('-');

						if (
							filtersArray[filter] &&
							(Number(
								calculateOffPrice(
									product[filter],
									product['off']
								)
							) > parseInt(priceFilter[1]) ||
								Number(
									calculateOffPrice(
										product[filter],
										product['off']
									)
								) < parseInt(priceFilter[0]))
						) {
							match = false;
						}
					} else if (filter === 'off' && filtersArray[filter]) {
						if (
							filtersArray[filter] &&
							Number(product[filter]) === 0
						) {
							match = false;
						}
					} else if (filtersArray[filter]) {
						if (
							filtersArray[filter] &&
							product[filter].toString().toLowerCase() !==
								filtersArray[filter].toString().toLowerCase()
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

		if (filtersArray['limit']) {
			filteredproducts = filteredproducts.slice(
				0,
				Number(filtersArray['limit'])
			);
		}

		let data = filteredproducts;

		if (data.length === 1 && single === true) {
			return data[0];
		}

		return data;
	} catch (error) {
		return error;
	}
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
					return {
						...theProduct,
						selectedColor: [product.color],
						count: product.count,
					};
				}
			})
		);
		return cartProducts;
	} else {
		return false;
	}
}

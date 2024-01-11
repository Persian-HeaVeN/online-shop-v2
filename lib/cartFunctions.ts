'use client';

export function addToCart(
	id: number,
	update: Function,
	session: any,
	color: string
) {
	if (!session) {
		return false;
	}

	let cart = session?.user?.cart;
	let exist = false;
	cart.forEach((products: any) => {
		if (products.id === id && products.color == color) {
			products.count += 1;
			exist = true;
		}
	});

	if (exist === false) {
		cart.push({ id: id, count: 1, color: color });
	}

	update({ cart: cart });
}

export function getProductInCartCount(id: number, session: any, color: string) {
	if (!session) {
		return 0;
	}
	let cart = session?.user?.cart;
	let count = 0;
	cart.forEach((products: any) => {
		if (products.id === id && products.color === color) {
			count = products.count;
		}
	});
	return count;
}

export function isInCart(id: number, session: any) {
	if (!session) {
		return false;
	}
	let cart = session?.user?.cart;
	let exist = false;
	cart.forEach((products: any) => {
		if (products.id === id) {
			exist = true;
		}
	});
	return exist;
}

export function removeFromCart(
	id: number,
	update: Function,
	session: any,
	color: string
) {
	if (!session) {
		return false;
	}
	let cart = session?.user?.cart;
	let exist = false;
	cart.forEach((products: any, index: number) => {
		if (products.id === id && products.color === color) {
			if (products.count > 1) {
				products.count -= 1;
			} else {
				cart.splice(index, 1);
			}
			exist = true;
		}
	});

	if (exist === false) {
		return false;
	}

	update({ cart: cart });
}

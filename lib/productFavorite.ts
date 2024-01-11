'use client';

export function toggleFavorite(id: number, update: Function, session: any) {
	if (!session) {
		return false;
	}
	let favorites = session?.user?.favorites;

	if (favorites.includes(id)) {
		const productIndex = favorites.indexOf(id);
		favorites.splice(productIndex, 1);
	} else {
		favorites.push(id);
	}

	update({ favorites: favorites });
}

export function isFavorite(id: number, update: Function, session: any) {
	if (!session) {
		return false;
	}
	
	let favorites = session?.user?.favorites;

	if (favorites.includes(id)) {
		return true;
	} else {
		return false;
	}
}

'use server';
import { ServerProducts } from '@/lib/ServerFunctions';
import notFound from './not-found';
import Navbar from '@/components/Navbar';
import ProductInfo from '@/components/ProductInfo';

export default async function page(params: any) {
	const productID = params.params.id;
	const product = await ServerProducts(`id=${productID}`, true);
	if (product.length === 0) {
		return notFound();
	}
	return (
		<>
			<Navbar />
			<ProductInfo product={product} />
		</>
	);
}

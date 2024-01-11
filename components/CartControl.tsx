'use client';
import {
	addToCart,
	getProductInCartCount,
	isInCart,
	removeFromCart,
} from '@/lib/cartFunctions';
import {
	AddRounded as AddIcon,
	RemoveRounded as RemoveIcon,
	DeleteForeverRounded as DeleteIcon,
} from '@mui/icons-material';

export default function CartControl(params: any) {
	const { id, session, update, color } = params;

	return (
		<>
			{session && (
				<div className='flex gap-1 border-1.5 rounded-xl px-[2px]'>
					{isInCart(id, session) ? (
						<>
							{getProductInCartCount(id, session, color) > 1 ? (
								<RemoveIcon
									onClick={() =>
										removeFromCart(id, update, session, color)
									}
									className='icon-hover text-[1.5rem]'
								/>
							) : (
								<DeleteIcon
									onClick={() =>
										removeFromCart(id, update, session, color)
									}
									className='icon-hover text-[1.5rem]'
								/>
							)}
							{getProductInCartCount(id, session, color)}
							<AddIcon
								onClick={() => addToCart(id, update, session, color)}
								className='icon-hover text-[1.5rem]'
							/>
						</>
					) : (
						<AddIcon
							onClick={() => addToCart(id, update, session, color)}
							className='icon-hover text-[1.8rem]'
						/>
					)}
				</div>
			)}
		</>
	);
}

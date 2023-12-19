'use client';
import {
	ShoppingCartOutlined as CartIcon,
	FavoriteBorderOutlined as FavoriteIcon,
	PersonOutline as UserIcon,
	DiamondRounded as DiamondIcon,
	Search as SearchIcon,
} from '@mui/icons-material';
import ProductsDropDown from './ProductsDropDown';

export default async function Navbar() {
	return (
		<nav className='flex items-center w-full hover:border-secondary hover:shadow-secondary border-2 border-white rounded-2xl px-2 shadow-white shadow-lg mb-5 transition-all'>
			<div className='flex gap-2 justify-start items-center ps-2 w-1/3'>
				<ProductsDropDown />
				<SearchIcon
					style={{ fontSize: '2rem' }}
					className='text-white icon-hover'
				/>
			</div>
			<div className='flex justify-center w-1/3 items-center text-xl select-none'>
				<p>Diamond</p>
				<DiamondIcon
					style={{ fontSize: '4rem' }}
					className='text-secondary hover:text-white transition hover:cursor-pointer'
				/>
				<p>Shop</p>
			</div>
			<div className='flex justify-end w-1/3 gap-2 pe-2'>
				<FavoriteIcon
					style={{ fontSize: '2rem' }}
					className='text-white icon-hover'
				/>
				<UserIcon
					style={{ fontSize: '2rem' }}
					className='text-white icon-hover'
				/>
				<CartIcon
					style={{ fontSize: '2rem' }}
					className='text-white icon-hover'
				/>
			</div>
		</nav>
	);
}

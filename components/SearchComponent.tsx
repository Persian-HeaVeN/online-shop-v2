'use client';
import React, { useState } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Slider,
	Tooltip,
} from '@nextui-org/react';
import {
	TuneRounded as OptionsIcon,
	Search as SearchIcon,
} from '@mui/icons-material';
import AnimatedComponent from './AnimatedComponents';
import { iphoneAnimation } from '@/lib/framerTransitions';
import { useRouter } from 'next/navigation';
import { stringSimilarity } from 'string-similarity-js';

export default function SearchModal() {
	const router = useRouter();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [moreOptions, setMoreOptions] = useState(false);
	const [priceRange, setPriceRange] = useState([0, 5000]); // Initialize with default value
	const [searchButton, setSearchButton] = useState('Search');
	const [category, setCategory] = useState<string>('');
	const [isNew, setIsNew] = useState(false);
	const [isOnSale, setIsOnSale] = useState(false);
	const [searchText, setSearchText] = useState('');

	const handleSliderChange = (value: any) => {
		setPriceRange(value);
	};

	const handleNewCheckBoxChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setIsNew(event.target.checked);
	};

	const handleOnSaleCheckBoxChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setIsOnSale(event.target.checked);
	};

	const handleSelectChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setCategory(event.target.value);
	};

	function handleSearchClick() {
		setSearchButton('Searching...');
		router.refresh();

		router.replace(
			`/products?${category !== '' ? 'category=' + category : ''}${
				isNew === true ? '&new=true' : ''
			}${isOnSale === true ? '&off=true' : ''}&price=${priceRange[0]}-${
				priceRange[1]
			}${searchText ? '&text=' + searchText.replace(/ /g, '-') : ''}`
		);
		setSearchButton('Search');
	}

	function resetHandler() {
		setCategory('');
		setIsNew(false);
		setIsOnSale(false);
	}

	return (
		<>
			<SearchIcon
				onClick={onOpen}
				style={{ fontSize: '2rem' }}
				className='text-white icon-hover'
			/>
			<Modal
				backdrop='blur'
				size='lg'
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				hideCloseButton
				isDismissable={false}
				placement='center'
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex justify-center'>
								Search Bar
							</ModalHeader>
							<ModalBody>
								<div className='flex items-center w-full'>
									<input
										className=' w-11/12 p-3 rounded-xl outline-none'
										placeholder='Search ...'
										type='search'
										value={searchText}
										onChange={(e) =>
											setSearchText(e.target.value)
										}
									/>
									<div className='w-1/12 flex justify-center'>
										<OptionsIcon
											className='icon-hover'
											onClick={() =>
												setMoreOptions(!moreOptions)
											}
											style={{ fontSize: '2rem' }}
										/>
									</div>
								</div>
								{moreOptions && (
									<AnimatedComponent
										animation={iphoneAnimation}
									>
										<main className='flex flex-col gap-5 mt-2'>
											<Slider
												label='Price Range'
												onChange={handleSliderChange}
												step={10}
												minValue={0}
												maxValue={5000}
												value={priceRange}
												defaultValue={[
													priceRange[0],
													priceRange[1],
												]}
												showTooltip={true}
												tooltipProps={{
													placement: 'bottom',
													classNames: {
														base: [
															// arrow color
															'before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500',
														],
														content: [
															'py-2 shadow-xl',
															'text-white bg-gradient-to-r from-secondary-400 to-primary-500',
														],
													},
												}}
												color='secondary'
												formatOptions={{
													style: 'currency',
													currency: 'USD',
													maximumFractionDigits: 0,
												}}
												className=''
											/>
											<div className='flex w-full'>
												<div className='w-4/12 text-center'>
													<label htmlFor='category-select'>
														Category :
													</label>
												</div>
												<select
													className='p-2 text-center w-8/12 rounded-xl'
													name='category'
													id='category-select'
													value={category}
													onChange={
														handleSelectChange
													}
												>
													<option value={''}>
														All
													</option>
													<option value={'phone'}>
														Phones
													</option>
													<option value={'laptop'}>
														Laptops
													</option>
													<option value={'watch'}>
														Watches
													</option>
												</select>
											</div>
											<div className='flex justify-around'>
												<div>
													<label
														className='me-2'
														htmlFor='onsale-checkbox'
													>
														On Sale
													</label>
													<input
														type='checkbox'
														id='onsale-checkbox'
														checked={isOnSale}
														onChange={
															handleOnSaleCheckBoxChange
														}
													/>
												</div>
												<div>
													<label
														className='me-2'
														htmlFor='new-checkbox'
													>
														New
													</label>
													<input
														type='checkbox'
														id='new-checkbox'
														checked={isNew}
														onChange={
															handleNewCheckBoxChange
														}
													/>
												</div>
											</div>
										</main>
									</AnimatedComponent>
								)}
							</ModalBody>
							<ModalFooter className='flex justify-center'>
								<Button
									className='bg-gradient-to-tl to-primary from-cyan-400'
									variant='solid'
									onClick={resetHandler}
								>
									Reset
								</Button>
								<Button
									color='danger'
									variant='solid'
									onPress={onClose}
									onClick={() => setMoreOptions(false)}
								>
									Close
								</Button>
								<Button
									className='text-white bg-gradient-to-tr from-secondary to-primary'
									disabled={
										searchButton === 'Search' ? false : true
									}
									onClick={() => {
										handleSearchClick();
										onClose();
									}}
								>
									{searchButton}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

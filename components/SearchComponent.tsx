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

export default function SearchModal() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [moreOptions, setMoreOptions] = useState(false);
	const [priceRange, setPriceRange] = useState([0, 100]); // Initialize with default value

	const handleSliderChange = (value: any) => {
		setPriceRange(value);
	};

	return (
		<>
			<SearchIcon
				onClick={onOpen}
				style={{ fontSize: '2rem' }}
				className='text-white icon-hover show-in md'
			/>
			<Modal
				backdrop='blur'
				size='lg'
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				hideCloseButton
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
										<main className='mt-2'>
											<Slider
												label='Price Range'
												onChange={handleSliderChange}
												step={10}
												minValue={0}
												maxValue={5000}
												defaultValue={[0, 5000]}
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
										</main>
									</AnimatedComponent>
								)}
							</ModalBody>
							<ModalFooter className='flex justify-center'>
								<Button
									color='danger'
									variant='solid'
									onPress={onClose}
								>
									Close
								</Button>
								<Button
									className='text-primary'
									color='secondary'
									onPress={onClose}
								>
									Search
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

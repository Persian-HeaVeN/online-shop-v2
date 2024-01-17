'use client';
import React, { useState, forwardRef, useImperativeHandle, Ref } from 'react';
import { Image } from '@nextui-org/react';
import {
	KeyboardArrowRightRounded as RightIcon,
	KeyboardArrowLeftRounded as LeftIcon,
} from '@mui/icons-material';
import { ChangeProfile } from '@/lib/SiteFunctions';
import { useSession } from 'next-auth/react';

type ImageData = {
	id: number;
	src: string;
};

type ImageCarouselProps = {
	images: ImageData[];
};

export interface ImageCarouselHandles {
	changeSessionProfile: () => void;
}

function ImageCarouselComponent(
	{ images }: ImageCarouselProps,
	ref: Ref<ImageCarouselHandles>
) {
	const { data: session, update } = useSession();
	const [currentIndex, setCurrentIndex] = useState(1);

	const changeCurrentProfile = (state: string) => {
		if (state === '+') {
			setCurrentIndex(
				currentIndex + 1 < images.length ? currentIndex + 1 : 0
			);
		} else if (state === '-') {
			setCurrentIndex(
				currentIndex - 1 >= 0 ? currentIndex - 1 : images.length - 1
			);
		}
	};

	useImperativeHandle(ref, () => ({
		changeSessionProfile,
	}));

	function changeSessionProfile() {
		ChangeProfile(currentIndex + 1, update, session);
	}

	const getClassName = (index: number) => {
		if (index === currentIndex) return 'scale-125 mx-4 border-secondary';
		if (
			(currentIndex + 1) % images.length === index ||
			(currentIndex - 1 + images.length) % images.length === index
		)
			return 'border-white';
		return 'hidden';
	};

	return (
		<div className='flex justify-center items-center h-[125px] w-full'>
			<LeftIcon
				className='icon-hover'
				onClick={() => changeCurrentProfile('-')}
				style={{ fontSize: '3rem' }}
			/>
			<div className='flex items-center justify-center space-x-4 h-full w-6/12 overflow-x-auto'>
				{images.map((image, index) => (
					<Image
						key={image.id}
						src={image.src}
						alt={`Image ${image.id}`}
						radius='full'
						onClick={() => setCurrentIndex(index)}
						className={`${getClassName(
							index
						)} transition-all w-[90px] cursor-pointer select-none bg-gray-400 border-2`}
					/>
				))}
			</div>
			<RightIcon
				className='icon-hover'
				onClick={() => changeCurrentProfile('+')}
				style={{ fontSize: '3rem' }}
			/>
		</div>
	);
}

const ImageCarousel = forwardRef<ImageCarouselHandles, ImageCarouselProps>(
	ImageCarouselComponent
);

export default ImageCarousel;

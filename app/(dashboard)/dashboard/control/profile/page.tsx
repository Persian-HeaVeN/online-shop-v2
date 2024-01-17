'use client';
import ImageCarousel, { ImageCarouselHandles } from '@/components/ImageSelector';
import { Image } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';

export default function ProfilePage() {
	const { data: session, update } = useSession();
	const carouselRef = useRef<ImageCarouselHandles>(null);
	const images = [
		{ id: 1, src: '/images/profile/1.png' },
		{ id: 2, src: '/images/profile/2.png' },
		{ id: 3, src: '/images/profile/3.png' },
		{ id: 4, src: '/images/profile/4.png' },
	];
	
	const changeProfile = () => {
        carouselRef.current?.changeSessionProfile();
    };

	const profileImageSrc = session?.user?.siteinfo?.profile
		? `/images/profile/${session.user.siteinfo.profile}.png`
		: '/images/profile/0.png';

	return (
		<main className='flex flex-col ps-10 gap-12 w-full'>
			<div className='flex items-center gap-5 w-full'>
				<h1>Your Current Profile Picture:</h1>
				<Image
					width={125}
					src={profileImageSrc}
					radius='full'
					className='profile-image'
				/>
			</div>
			<div className='grid gap-4 w-full'>
				<ImageCarousel ref={carouselRef} images={images} />
				<button onClick={changeProfile} className='btn btn-primary w-4/12 mx-auto'>Set</button>
			</div>
		</main>
	);
}

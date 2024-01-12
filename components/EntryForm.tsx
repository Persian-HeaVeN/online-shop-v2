'use client';

import { useRef, useState } from 'react';
import ButtonLoader from './ButtonLoader';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ServerExist, ServerRegister } from '@/lib/ServerFunctions';
import AnimatedComponent from './AnimatedComponents';
import {
	fadeInDown,
	fadeInLeft,
	iphoneAnimation,
} from '@/lib/framerTransitions';

export default function EntryForm() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		loading: false,
		button: 'Continue',
		email: '',
	});

	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

	async function submitHandler(event: any) {
		event.preventDefault();

		if (formData.button === 'Login') {
			if (passwordRef.current?.value === '' || formData.email === '') {
				toast.error('Please fill in all fields');
				return;
			}
			setFormData({ ...formData, loading: true });
			const res: any = await signIn('credentials', {
				email: formData.email,
				password: passwordRef.current?.value,
				redirect: false,
			});
			if (res.error) {
				toast.error('Invalid Credentials');
				setFormData({ ...formData, loading: false });
				return;
			} else {
				toast.success('Logged in successfully');
				setTimeout(() => {
					router.push('/');
				}, 1000);
				return;
			}
		}

		if (formData.button === 'Register') {
			if (
				nameRef.current?.value === '' ||
				passwordRef.current?.value === '' ||
				confirmPasswordRef.current?.value === ''
			) {
				toast.error('Please fill in all fields');
				return;
			}
			if (
				passwordRef.current?.value !== confirmPasswordRef.current?.value
			) {
				toast.error('Passwords do not match');
				return;
			}
			if (Number(passwordRef.current?.value.length) < 8) {
				toast.error('Password must be at least 8 characters');
				return;
			}
			setFormData({
				...formData,
				loading: true,
			});
			try {
				const res = await ServerRegister(
					nameRef.current?.value.toString() as string,
					passwordRef.current?.value.toString() as string,
					formData.email.toString().toLowerCase()
				);

				if (res.status) {
					toast.success('Successfully Registered');
					setFormData({
						...formData,
						loading: false,
						button: 'Login',
					});

					// after registered
					nameRef.current?.classList.add('zero');
					confirmPasswordRef.current?.classList.add('zero');
					setTimeout(() => {
						nameRef.current?.classList.add('hidden');
						confirmPasswordRef.current?.classList.add('hidden');
						passwordRef.current?.classList.remove('w-1/2');
						passwordRef.current?.classList.add('w-full');
					}, 1000);

					return;
				} else {
					toast.error(res.message);
					setFormData({
						...formData,
						loading: false,
					});
					return;
				}
			} catch (error: any) {
				setFormData({
					...formData,
					loading: false,
				});
				toast.error(error.message);
				return;
			}
		}

		if (formData.button === 'Continue' && formData.email === '') {
			toast.error('Please enter your email address');
			return;
		}
		setFormData({
			...formData,
			loading: true,
		});
		try {
			const result = await ServerExist(
				formData.email.toString().toLocaleLowerCase()
			);

			if (result === true) {
				setFormData({
					...formData,
					loading: false,
					button: 'Login',
				});
				emailRef.current?.setAttribute('disabled', 'true');
				passwordRef.current?.classList.remove('hidden');
				passwordRef.current?.classList.add('w-full');
				setTimeout(
					() => passwordRef.current?.classList.remove('zero'),
					10
				);
			} else {
				setFormData({
					...formData,
					loading: false,
					button: 'Register',
				});
				emailRef.current?.setAttribute('disabled', 'true');
				nameRef.current?.classList.remove('hidden');
				passwordRef.current?.classList.remove('hidden');
				confirmPasswordRef.current?.classList.remove('hidden');
				setTimeout(() => {
					confirmPasswordRef.current?.classList.remove('zero');
					passwordRef.current?.classList.remove('zero');
					nameRef.current?.classList.remove('zero');
				}, 10);
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	}

	return (
		<form onSubmit={submitHandler}>
			<div className='w-full'>
				<AnimatedComponent animation={fadeInLeft}>
					<h1>Login or Register</h1>
				</AnimatedComponent>
			</div>

			<input
				ref={nameRef}
				type='text'
				className='transition-1s zero hidden'
				placeholder='Name'
			/>

			<div className='w-full'>
				<AnimatedComponent animation={iphoneAnimation}>
					<input
						type='email'
						id='email_input'
						placeholder='Email Address'
						ref={emailRef}
						onChange={(e) =>
							setFormData({
								...formData,
								email: e.target.value.toString().toLowerCase(),
							})
						}
						value={formData.email}
					/>
				</AnimatedComponent>
			</div>

			<div className='flex w-9/12 gap-3'>
				<input
					ref={passwordRef}
					type='password'
					className='w-1/2 transition-1s zero hidden'
					placeholder='Password'
				/>
				<input
					ref={confirmPasswordRef}
					type='password'
					className='w-1/2 transition-1s zero hidden'
					placeholder='Confirm Password'
				/>
			</div>

			<AnimatedComponent classname={'flex justify-center w-full'} animation={fadeInDown}>
				<button
					type='submit'
					disabled={formData.loading}
					className='btn btn-primary flex items-center justify-center'
				>
					{formData.loading === true ? (
						<ButtonLoader />
					) : (
						formData.button
					)}
				</button>
			</AnimatedComponent>
		</form>
	);
}

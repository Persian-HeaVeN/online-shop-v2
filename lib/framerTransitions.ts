export const iphoneAnimation = {
	initial: { opacity: 0, scale: 0.8 },
	animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
	transition: {
		type: 'spring',
		stiffness: 200,
		damping: 20,
		beforeChildren: true,
	},
};

export const fadeInUp = {
	initial: { opacity: 0, y: -100 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const fadeInDown = {
	initial: { opacity: 0, y: 100 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const fadeInRight = {
	initial: { opacity: 0, x: 100 },
	animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export const fadeInLeft = {
	initial: { opacity: 0, x: -60 },
	animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

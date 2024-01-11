import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const AnimatedWidth = ({ children }: { children: React.ReactNode }) => {
	const controls = useAnimation();

	useEffect(() => {
		controls.start({ width: '100%' });
	}, [controls]);

	return (
		<motion.div
			initial={{ width: 0 }}
            style={{ overflow: 'hidden'}}
			animate={controls}
			transition={{ duration: 1, ease: 'easeInOut' }}
		>
			{children}
		</motion.div>
	);
};

export default AnimatedWidth;

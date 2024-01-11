import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedComponent = ({
	children,
	animation,
	classname = '',
}: {
	children: React.ReactNode;
	animation: any;
	classname?: any;
}) => {
	const [ref, inView] = useInView({
		triggerOnce: true,
	});

	return (
		<motion.div
			ref={ref}
			initial='initial'
			animate={inView ? 'animate' : 'initial'}
			variants={animation}
			className={classname}
		>
			{children}
		</motion.div>
	);
};

export default AnimatedComponent;

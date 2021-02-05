import {createStyles, makeStyles} from '@material-ui/core'
import {motion} from 'framer-motion'
import React from 'react'

const useStyle = makeStyles(_ => createStyles({
	defaultSizedContainer: {
		height: '100%'
	}
}))

const PageFade = ({children}: {
	children: JSX.Element | JSX.Element[];
}) => {
	const classes = useStyle()

	return (
		<motion.div
			className={classes.defaultSizedContainer}
			initial="hidden"
			animate="visable"
			exit="hidden"
			// Define the animation
			variants={{
				hidden: {
					opacity: 0
				},
				visable: {
					opacity: 1
				}
			}}
			transition={{
				hidden: {
					duration: 0.195,
					ease: 'easeInOut'
				},
				visable: {
					duration: 0.225,
					ease: 'easeInOut'
				}
			}}
		>
			{children}
		</motion.div>
	)
}

export default PageFade

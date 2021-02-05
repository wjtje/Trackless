import {createStyles, makeStyles} from '@material-ui/core'
import {motion} from 'framer-motion'
import React from 'react'

// Custom styles
const useStyle = makeStyles(_ => createStyles({
	// Make sure the component takes all the available height
	root: {
		height: '100%'
	}
}))

/**
 * This animation is used to fade pages in and out
 *
 * The only thing you need to do is wrap your page in this component
 */
const PageFade = ({children}: {
	children: JSX.Element | JSX.Element[];
}) => {
	const classes = useStyle()

	return (
		<motion.div
			className={classes.root}
			initial="hidden"
			animate="visable"
			exit="hidden"
			// Define the states
			variants={{
				hidden: {
					opacity: 0
				},
				visable: {
					opacity: 1
				}
			}}
			// Custom transistions
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

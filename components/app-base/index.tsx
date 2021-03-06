import {Container, createStyles, CssBaseline, makeStyles} from '@material-ui/core'
import React, {useState} from 'react'
import AppBaseBar from '../app-base-bar'
import AppDrawer from '../app-drawer'
import {AnimatePresence} from 'framer-motion'
import {useRouter} from 'next/router'

// Custom styles used on this page
const useStyle = makeStyles(theme => createStyles({
	root: {
		display: 'flex'
	},
	content: {
		flexGrow: 1,
		height: '100vh',
		paddingTop: 56,
		overflow: 'hidden',
		'@media (min-width:0px) and (orientation: landscape)': {
			paddingTop: 48
		},
		[theme.breakpoints.up('sm')]: {
			paddingTop: 64
		}
	},
	toolbar: theme.mixins.toolbar,
	scroll: {
		height: '100%',
		overflow: 'auto'
		// PaddingTop: theme.spacing(2),
		// paddingBottom: theme.spacing(2)
	},
	defaultSizedContainer: {
		height: '100%'
	}
}))

interface props {
	children: JSX.Element;
}

/**
 * This component will contain the appBar, drawer and other things
 * that are shown a cross pages.
 *
 * The appBar and Drawer live in separate components
 */
const AppBase = ({children}: props) => {
	const classes = useStyle()
	const router = useRouter()

	const [drawer, setDrawer] = useState(false)

	return (
		<div className={classes.root}>
			<CssBaseline/>

			<AppBaseBar
				showDrawer={() => {
					setDrawer(true)
				}}
			/>

			<AppDrawer
				drawerOpen={drawer}
				onDrawerClose={() => {
					setDrawer(false)
				}}
			/>

			{/* Make sure the content take the full height and the scrollbar is on the right side of the screen */}
			<div className={classes.content}>
				<div className={classes.scroll}>
					{/* This is animating page changes */}
					<AnimatePresence exitBeforeEnter>
						<div
							key={router.route}
							className={classes.defaultSizedContainer}
						>
							{children}
						</div>
					</AnimatePresence>
				</div>
			</div>
		</div>
	)
}

export default AppBase

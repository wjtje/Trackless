import {AppBar, createStyles, IconButton, makeStyles, Toolbar, Typography} from '@material-ui/core'
import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'

const useStyle = makeStyles(theme => createStyles({
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	menuBtn: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	},
	title: {
		flexGrow: 1
	}
}))

interface props {
	showDrawer: () => void;
}

/**
 * This is the base appBar shown a cross all pages
 */
const AppBaseBar = ({showDrawer}: props) => {
	const classes = useStyle()

	return (
		<AppBar
			position="fixed"
			className={classes.appBar}
		>
			<Toolbar>
				{/* The menu button, this button will be hidden on larger screens */}
				<IconButton
					edge="start"
					color="inherit"
					aria-label="menu"
					className={classes.menuBtn}
					onClick={showDrawer}
				>
					<MenuIcon/>
				</IconButton>

				{/* The main title */}
				<Typography
					className={classes.title}
					variant="h6"
				>
					Trackless
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default AppBaseBar

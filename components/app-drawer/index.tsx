import {Drawer, List} from '@material-ui/core'
import React from 'react'
import Hidden from '@material-ui/core/Hidden'
import clsns from 'classnames'
import Typography from '@material-ui/core/Typography'
import {makeStyles, useTheme, Theme, createStyles} from '@material-ui/core/styles'
import useAccess from '../../scripts/hooks/use-access'
import {exportPageAccess} from '../../pages/export'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import {useRouter} from 'next/router'
import {accountPageAccess} from '../../pages/account'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import {locationPageAccess} from '../../pages/location'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import AppDrawerItem from './item'
import {userPageAccess} from '../../pages/users'
import PersonIcon from '@material-ui/icons/Person'

export const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		drawer: {
			[theme.breakpoints.up('md')]: {
				width: drawerWidth,
				flexShrink: 0
			}
		},
		// Necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
		drawerHeader: {
			paddingLeft: theme.spacing(2),
			alignItems: 'center',
			display: 'flex'
		},
		drawerPaper: {
			width: drawerWidth
		}
	})
)

interface Props {
	drawerOpen: boolean;
	onDrawerClose: () => void;
}

/**
 * A drawer that is used all over the all
 * It will automaticly show and hide option based on the users access
 */
const AppDrawer = (props: Props) => {
	const classes = useStyles()
	const theme = useTheme()
	const {accessList} = useAccess()
	const router = useRouter()

	/**
	 * A list of items for the drawer
	 */
	const items = (
		<div>
			{/* This is normaly hidden */}
			<div className={clsns(classes.toolbar, classes.drawerHeader)}>
				<Typography variant="h6">Main menu</Typography>
			</div>
			<List>
				<AppDrawerItem
					accessList={accessList}
					pageList={exportPageAccess}
					url="/export"
					name="Export"
					Icon={ImportExportIcon}
					onClick={props.onDrawerClose}
				/>

				<AppDrawerItem
					accessList={accessList}
					pageList={locationPageAccess}
					url="/location"
					name="Location"
					Icon={LocationOnIcon}
					onClick={props.onDrawerClose}
				/>
				<AppDrawerItem
					accessList={accessList}
					pageList={userPageAccess}
					url="/users"
					name="Users"
					Icon={PersonIcon}
					onClick={props.onDrawerClose}
				/>

				<AppDrawerItem
					accessList={accessList}
					pageList={accountPageAccess}
					url="/account"
					name="Account"
					Icon={AccountBoxIcon}
					onClick={props.onDrawerClose}
				/>
			</List>
		</div>
	)

	return (
		<nav className={classes.drawer}>
			{/* The mobile drawer */}
			<Hidden mdUp implementation="css">
				<Drawer
					variant="temporary"
					anchor={theme.direction === 'rtl' ? 'right' : 'left'}
					open={props.drawerOpen}
					classes={{
						paper: classes.drawerPaper
					}}
					ModalProps={{
						keepMounted: true // Better open performance on mobile.
					}}
					onClose={props.onDrawerClose}
				>
					{items}
				</Drawer>
			</Hidden>
			{/* The desktop drawer */}
			<Hidden smDown implementation="css">
				<Drawer
					open
					classes={{
						paper: classes.drawerPaper
					}}
					variant="permanent"
				>
					{items}
				</Drawer>
			</Hidden>
		</nav>
	)
}

export default AppDrawer

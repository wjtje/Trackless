import {Drawer, List, ListItem, ListItemText} from '@material-ui/core'
import React from 'react'
import Hidden from '@material-ui/core/Hidden'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import clsns from 'classnames'
import Typography from '@material-ui/core/Typography'
import {makeStyles, useTheme, Theme, createStyles} from '@material-ui/core/styles'
import useAccess from '../../scripts/hooks/use-access'
import {exportPageAccess} from '../../pages/export'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {accountPageAccess} from '../../pages/account'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

export const drawerWidth = 240

/**
 * Custom styles used by and for the appDrawer
 *
 * Give the root of the page the root class.
 * The appBar the appBar class.
 * And the menuButton the menuButton class.
 */
export const useDrawerStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex'
		},
		drawer: {
			[theme.breakpoints.up('md')]: {
				width: drawerWidth,
				flexShrink: 0
			}
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1
			// [theme.breakpoints.up('md')]: {
			// 	width: `calc(100% - ${drawerWidth}px)`,
			// 	marginLeft: drawerWidth
			// }
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('md')]: {
				display: 'none'
			}
		},
		mainContent: {
			marginTop: theme.spacing(2)
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
		},
		content: {
			flexGrow: 1
		},
		// Styles for the list items
		listItem: {
			height: 40,
			margin: '4px 8px',
			padding: '0px 8px',
			width: 'auto',
			borderRadius: '4px',
			transitionTimingFunction: 'ease',
			transition: 'background 0.5s'
		},
		listItemActive: {
			background: 'rgba(4,75,127,.12)',
			color: '#044b7f',
			'&:hover': {
				background: 'rgba(4,75,127,.24)'
			}
		},
		listItemIconActive: {
			fill: '#044b7f'
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
	const classes = useDrawerStyles()
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
				{exportPageAccess.every(value => accessList.includes(value)) ? (
					<Link href="/export">
						<ListItem
							button
							className={clsns(classes.listItem, {
								[classes.listItemActive]: router.pathname === '/export'
							})}
						>
							<ListItemIcon>
								<ImportExportIcon className={clsns({
									[classes.listItemIconActive]: router.pathname === '/export'
								})}/>
							</ListItemIcon>
							<ListItemText primary="Export"/>
						</ListItem>
					</Link>
				) : null}

				{accountPageAccess.every(value => accessList.includes(value)) ? (
					<Link href="/account">
						<ListItem
							button
							className={clsns(classes.listItem, {
								[classes.listItemActive]: router.pathname === '/account'
							})}
						>
							<ListItemIcon>
								<AccountBoxIcon className={clsns({
									[classes.listItemIconActive]: router.pathname === '/account'
								})}/>
							</ListItemIcon>
							<ListItemText primary="Account"/>
						</ListItem>
					</Link>
				) : null}
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

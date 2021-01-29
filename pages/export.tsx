import {AppBar, Container, createStyles, CssBaseline, Fab, IconButton, makeStyles, Theme, Toolbar, Typography} from '@material-ui/core'
import React, {useState} from 'react'
import appbarStyles from '../styles/Appbar.module.css'
import useUsers from '../scripts/hooks/use-users'
import MenuIcon from '@material-ui/icons/Menu'
import AppBarSearch from '../components/app-bar-search'
import clsns from 'classnames'
import TracklessUser from '../scripts/classes/trackless-user'
import GetAppIcon from '@material-ui/icons/GetApp'
import AppDrawer, {useDrawerStyles} from '../components/app-drawer'

export const exportPageAccess = [
	'trackless.user.readAll',
	'trackless.work.readAll'
]

// Custom styles used on this page
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		title: {
			display: 'none',
			flexGrow: 1,
			[theme.breakpoints.up('sm')]: {
				display: 'block'
			}
		},
		container: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		},
		emptyText: {
			textAlign: 'center'
		},
		hidden: {
			display: 'none'
		},
		fab: {
			position: 'absolute',
			bottom: theme.spacing(2),
			right: theme.spacing(2),
			margin: theme.spacing(1)
		},
		extendedIcon: {
			marginRight: theme.spacing(1)
		}
	})
)

/**
 * A page to export user's work to a pdf
 */
const Export = () => {
	const {users} = useUsers()
	const classes = useStyles()
	const drawerClasses = useDrawerStyles()

	const [selectedUser, setSelectedUser] = useState<TracklessUser>(null)
	const [drawer, setDrawer] = useState(false)

	return (
		<div className={drawerClasses.root}>
			<CssBaseline/>
			<AppBar position="fixed" className={drawerClasses.appBar}>
				<Toolbar>
					<IconButton
						edge="start"
						className={clsns(appbarStyles.menuButton, drawerClasses.menuButton)}
						color="inherit"
						aria-label="menu"
						onClick={() => {
							setDrawer(true)
						}}
					>
						<MenuIcon/>
					</IconButton>

					<Typography
						variant="h6"
						className={classes.title}
					>
						Trackless
					</Typography>

					{/* A search bar to search users */}
					<AppBarSearch
						options={users}
						optionLabel={user => user?.fullname}
						optionSelected={(option, value) => option.userID === value.userID}
						onSelect={value => {
							setSelectedUser(value)
							console.log(`New selected user: ${value?.fullname}`)
						}}
					/>
				</Toolbar>
			</AppBar>

			<AppDrawer
				drawerOpen={drawer}
				onDrawerClose={() => {
					setDrawer(false)
				}}
			/>

			<Container className={drawerClasses.content}>
				<div className={drawerClasses.toolbar}/>
				<div className={clsns(classes.container, 'container')}>
					{/* Show a hint when no user is selected */}
					{(selectedUser === null) ?
						<div>
							<Typography variant="h5" className={classes.emptyText}>
								No user selected
							</Typography>
							<Typography variant="body2" className={classes.emptyText}>
								Select a user from the searchbar or download all users at once
							</Typography>
						</div> : <Typography>{selectedUser.fullname} - {selectedUser.userID}</Typography> }
				</div>
			</Container>

			<Fab
				className={classes.fab}
				variant="extended"
				color="secondary"
			>
				<GetAppIcon className={classes.extendedIcon}/>
				Download
			</Fab>
		</div>
	)
}

export default Export

import {AppBar, Container, createStyles, CssBaseline, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Toolbar, Typography} from '@material-ui/core'
import React, {useState} from 'react'
import AppDrawer, {useDrawerStyles} from '../components/app-drawer'
import appbarStyles from '../styles/Appbar.module.css'
import MenuIcon from '@material-ui/icons/Menu'
import clsns from 'classnames'
import useAccount from '../scripts/hooks/use-account'
import {Skeleton} from '@material-ui/lab'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import DevicesIcon from '@material-ui/icons/Devices'
import GetAppIcon from '@material-ui/icons/GetApp'
import EditIcon from '@material-ui/icons/Edit'

export const accountPageAccess = [
	'trackless.user.readOwn'
]

// Custom styles used on this page
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		tableHeader: {
			textAlign: 'left',
			paddingRight: '8px'
		},
		list: {
			width: 'auto',
			[theme.breakpoints.up('sm')]: {
				width: '300px'
			}
		}
	})
)

const Account = () => {
	const drawerClasses = useDrawerStyles()
	const classes = useStyles()
	const {account, isLoading, error} = useAccount()

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
					>
						Trackless
					</Typography>
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
				<div className={drawerClasses.mainContent}>
					<Typography variant="h5">
						{isLoading && !error ? <Skeleton/> : `Hello ${account.fullname}!`}
					</Typography>
					<Typography variant="h6">
						Your details
					</Typography>
					<table>
						<tr>
							<th className={classes.tableHeader}>
								<Typography>
									Firstname
								</Typography>
							</th>
							<td>
								<Typography>
									{account?.firstname}
								</Typography>
							</td>
						</tr>
						<tr>
							<th className={classes.tableHeader}>
								<Typography>
									Lastname
								</Typography>
							</th>
							<td>
								<Typography>
									{account?.lastname}
								</Typography>
							</td>
						</tr>
						<tr>
							<th className={classes.tableHeader}>
								<Typography>
									Username
								</Typography>
							</th>
							<td>
								<Typography>
									{account?.username}
								</Typography>
							</td>
						</tr>
						<tr>
							<th className={classes.tableHeader}>
								<Typography>
									Group
								</Typography>
							</th>
							<td>
								<Typography>
									{account?.groupName}
								</Typography>
							</td>
						</tr>
					</table>
					<Typography variant="h6">
						Options for your account
					</Typography>
					<List className={classes.list}>
						<ListItem button>
							<ListItemIcon>
								<VpnKeyIcon/>
							</ListItemIcon>
							<ListItemText primary="Change password"/>
						</ListItem>
						<ListItem button>
							<ListItemIcon>
								<DevicesIcon/>
							</ListItemIcon>
							<ListItemText primary="Connected devices"/>
						</ListItem>
						<ListItem button>
							<ListItemIcon>
								<GetAppIcon/>
							</ListItemIcon>
							<ListItemText primary="Download details"/>
						</ListItem>
						<ListItem button>
							<ListItemIcon>
								<EditIcon/>
							</ListItemIcon>
							<ListItemText primary="Edit details"/>
						</ListItem>
					</List>
				</div>
			</Container>
		</div>
	)
}

export default Account

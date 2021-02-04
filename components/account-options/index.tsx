import {createStyles, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Typography} from '@material-ui/core'
import React from 'react'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import DevicesIcon from '@material-ui/icons/Devices'
import GetAppIcon from '@material-ui/icons/GetApp'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		list: {
			width: 'auto',
			[theme.breakpoints.up('sm')]: {
				width: '300px'
			}
		}
	})
)

/**
 * A list with options for your account
 */
const AccountOptions = () => {
	const classes = useStyles()

	return (
		<>
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
		</>
	)
}

export default AccountOptions

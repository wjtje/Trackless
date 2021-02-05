import {createStyles, Fab, Grid, List, ListItem, ListItemText, makeStyles, Theme, Typography, Zoom} from '@material-ui/core'
import React, {useState} from 'react'
import useUsers from '../scripts/hooks/use-users'
import TracklessUser from '../scripts/classes/trackless-user'
import GetAppIcon from '@material-ui/icons/GetApp'
import PageFade from '../components/page-fade'
import {useIsPresent} from 'framer-motion'
import clsns from 'classnames'

export const exportPageAccess = [
	'trackless.user.readAll',
	'trackless.work.readAll'
]

// Custom styles used on this page
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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
		},
		userListContainer: {
			width: '50%',
			height: '100%',
			float: 'left',
			padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
			overflowY: 'scroll',
			[theme.breakpoints.down('sm')]: {
				width: '100%'
			}
		},
		userDetailContainer: {
			width: '50%',
			height: '100%',
			float: 'right',
			[theme.breakpoints.down('sm')]: {
				display: 'none !important'
			}
		},
		userDetailEmptyContainer: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		},
		emptyText: {
			textAlign: 'center'
		}
	})
)

/**
 * A page to export user's work to a pdf
 */
const Export = () => {
	const {users} = useUsers()
	const classes = useStyles()
	const isPresent = useIsPresent() // This is used for the zoom animation

	const [selectedUser, setSelectedUser] = useState<TracklessUser>(null)

	return (
		<>
			<PageFade>
				{/* <div className={classes.container}> */}
				{/* Show a hint when no user is selected */}
				{/* {(selectedUser === null) ?
						<div>
							<Typography variant="h5" className={classes.emptyText}>
								No user selected
							</Typography>
							<Typography variant="body2" className={classes.emptyText}>
								Select a user from the searchbar or download all users at once
							</Typography>
						</div> : <Typography>{selectedUser.fullname} - {selectedUser.userID}</Typography> } */}
				{/* </div> */}
				<div className={classes.userListContainer}>
					<List>
						{users?.map(user => (
							<ListItem
								key={user.userID}
								button
							>
								<ListItemText primary={user.fullname} secondary="{hours} recorded last week"/>
							</ListItem>
						))}
					</List>
				</div>

				<div
					className={clsns(
						classes.userDetailContainer,
						{
							[classes.userDetailEmptyContainer]: selectedUser === null
						}
					)}
				>
					<div>
						<Typography variant="h5" className={classes.emptyText}>
							No user selected
						</Typography>
						<Typography variant="body2" className={classes.emptyText}>
							Select a user from the list on the left or download all users at once
						</Typography>
					</div>
				</div>
			</PageFade>

			<Zoom in={isPresent}>
				<Fab
					className={classes.fab}
					variant="extended"
					color="secondary"
				>
					<GetAppIcon className={classes.extendedIcon}/>
					Download
				</Fab>
			</Zoom>
		</>
	)
}

export default Export

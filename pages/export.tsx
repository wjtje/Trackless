import {createStyles, Fab, makeStyles, Theme, Typography} from '@material-ui/core'
import React, {useState} from 'react'
import useUsers from '../scripts/hooks/use-users'
import TracklessUser from '../scripts/classes/trackless-user'
import GetAppIcon from '@material-ui/icons/GetApp'
import PageFade from '../components/page-fade'

export const exportPageAccess = [
	'trackless.user.readAll',
	'trackless.work.readAll'
]

// Custom styles used on this page
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100%'
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

	const [selectedUser, setSelectedUser] = useState<TracklessUser>(null)

	return (
	// 			{/* A search bar to search users */}
	// 			<AppBarSearch
	// 				options={users}
	// 				optionLabel={user => user?.fullname}
	// 				optionSelected={(option, value) => option.userID === value.userID}
	// 				onSelect={value => {
	// 					setSelectedUser(value)
	// 					console.log(`New selected user: ${value?.fullname}`)
	// 				}}
	// 			/>

		<>
			<PageFade>
				<div className={classes.container}>
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
			</PageFade>

			<Fab
				className={classes.fab}
				variant="extended"
				color="secondary"
			>
				<GetAppIcon className={classes.extendedIcon}/>
				Download
			</Fab>
		</>
	)
}

export default Export

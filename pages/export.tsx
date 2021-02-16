import {Button, createStyles, Fab, List, ListItem, ListItemText, makeStyles, Theme, Typography, Zoom} from '@material-ui/core'
import React, {useState} from 'react'
import useUsers from '../scripts/hooks/use-users'
import TracklessUser from '../scripts/classes/trackless-user'
import GetAppIcon from '@material-ui/icons/GetApp'
import PageFade from '../components/page-fade'
import {useIsPresent} from 'framer-motion'
import DetailPage from '../components/detail-page'
import ListPane from '../components/detail-page/list-pane'
import DetailPane from '../components/detail-page/detail-pane'

export const exportPageAccess = [
	'trackless.user.readAll',
	'trackless.work.readAll'
]

// Custom styles used on this page
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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
	const isPresent = useIsPresent() // This is used for the zoom animation

	const [selectedUser, setSelectedUser] = useState<TracklessUser>(null)

	return (
		<>
			<PageFade>
				<DetailPage
					hintTitle="No user selected"
					hintSubtext="Select a user from the list on the left or download all users at once"
					detailActive={selectedUser !== null}
				>
					<ListPane>
						{/* List of user on the system */}
						<List>
							{users?.map((user: TracklessUser) => (
								<ListItem
									key={user.userID}
									button
									onClick={() => {
										setSelectedUser(user)
									}}
								>
									<ListItemText primary={user.fullname} secondary="{hours} recorded last week"/>
								</ListItem>
							))}
						</List>
					</ListPane>
					<DetailPane>
						{/* Show information about the selected user */}
						<PageFade>
							<Typography>{selectedUser?.fullname} - {selectedUser?.userID}</Typography>
							<Button
								onClick={() => {
									setSelectedUser(null)
								}}
							>
								Close
							</Button>
						</PageFade>
					</DetailPane>
				</DetailPage>
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

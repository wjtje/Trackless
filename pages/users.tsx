import {createStyles, Fab, makeStyles, Zoom} from '@material-ui/core'
import {useIsPresent} from 'framer-motion'
import React, {useState} from 'react'
import DetailPage from '../components/detail-page'
import DetailPane from '../components/detail-page/detail-pane'
import ListPane from '../components/detail-page/list-pane'
import PageFade from '../components/page-fade'
import TracklessUser from '../scripts/classes/trackless-user'
import useUsers from '../scripts/hooks/use-users'
import {Add as AddIcon} from '@material-ui/icons'
import SearchableList from '../components/searchable-list'
import UserDetailPage from '../components/user-detail-page'

export const userPageAccess = [
	'trackless.user.readAll',
	'trackless.user.create',
	'trackless.user.editAll',
	'trackless.user.remove'
]

// Custom styles used on this page
const useStyles = makeStyles(theme =>
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
 * A page to see, edit and add users to the system
 */
const User = () => {
	const {users} = useUsers()
	const isPresent = useIsPresent()
	const classes = useStyles()

	const [currentSelectedUser, setCurrentSelectedUser] = useState<TracklessUser>(null)
	const [isAddingUser, setIsAddingUser] = useState(false)

	/**
	 * This is true when the detail page is (should) be active
	 */
	const detailActive = isAddingUser || currentSelectedUser !== null

	return (
		<PageFade>
			<DetailPage
				hintTitle="No user selected"
				hintSubtext="Select a user from the list or add a new one"
				detailActive={detailActive}
			>
				<ListPane>
					{/* List with all user's */}
					<SearchableList<TracklessUser>
						list={users}
						listProperties={{
							key: 'userID',
							primaryText: 'fullname',
							secondaryText: 'username'
						}}
						onClick={setCurrentSelectedUser}
					/>
				</ListPane>
				<DetailPane>
					{/* Add and edit page for user's */}
					<UserDetailPage
						currentSelectedUser={currentSelectedUser}
						onClose={() => {
							setCurrentSelectedUser(null)
							setIsAddingUser(false)
						}}
					/>
				</DetailPane>
			</DetailPage>

			<Zoom in={isPresent && !detailActive}>
				<Fab
					className={classes.fab}
					color="secondary"
					variant="extended"
					onClick={() => {
						setIsAddingUser(true)
					}}
				>
					<AddIcon className={classes.extendedIcon}/>
					Add
				</Fab>
			</Zoom>
		</PageFade>
	)
}

export default User

import {createStyles, Fab, List, ListItem, ListItemText, makeStyles, MenuItem, Zoom} from '@material-ui/core'
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
import DetailObject from '../components/detail-page/detail-object'
import useGroups from '../scripts/hooks/use-group'
import {inputValueCheckString} from '../components/detail-page/detail-object/input-value-check'
import {useSnackbar} from 'notistack'
import AppError from '../scripts/error/app-error'

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
	const {users, addUser} = useUsers()
	const {groups} = useGroups()
	const isPresent = useIsPresent()
	const classes = useStyles()
	const {enqueueSnackbar} = useSnackbar()

	const [currentSelectedUser, setCurrentSelectedUser] = useState<TracklessUser>(null)
	const [isAddingUser, setIsAddingUser] = useState(false)

	// States for checking the detail object input's
	const [isCheckingInputError, setIsCheckingInputError] = useState(false)
	const [isUsernameTaken, setIsUsernameTaken] = useState(false)

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
					<DetailObject
						properties={{
							firstname: {
								label: 'Firstname',
								type: 'string',
								inputCheck: inputValueCheckString('firstname')
							},
							lastname: {
								label: 'Lastname',
								type: 'string',
								inputCheck: inputValueCheckString('lastname')
							},
							username: {
								label: 'Username',
								type: 'string',
								inputCheck: inputValues => {
									return inputValueCheckString('username')(inputValues) || isCheckingInputError
								}
							},
							groupID: {
								label: 'Group',
								menuItems: groups.map(
									group => (
										<MenuItem
											key={group.groupID}
											value={group.groupID}
										>
											{group.groupName}
										</MenuItem>
									)
								),
								inputCheck: inputValueCheckString('groupID')
							},
							password: {
								label: 'Password',
								type: 'password',
								inputCheck: inputValueCheckString('password')
							}
						}}
						editObject={currentSelectedUser}
						isCheckError={isCheckingInputError}
						onClose={() => {
							setIsAddingUser(false)
							setCurrentSelectedUser(null)
							setIsCheckingInputError(false)
							setIsUsernameTaken(false)
						}}
						onSave={(editObject, inputValues, saveType) => {
							if (saveType === 'save') {
								// Add the user to the system
								void addUser(inputValues)
									.then(saved => {
										// Check if it's saved
										if (saved) {
											setIsAddingUser(false)
											setCurrentSelectedUser(null)
											setIsCheckingInputError(false)
											setIsUsernameTaken(false)
										}
									})
									.catch((error: unknown) => {
										if (error instanceof AppError) {
											// Show the user the error
											enqueueSnackbar(
												error.errorCode,
												{
													variant: 'error'
												}
											)

											// Check for common types of error's
											if (error.errorCode === 'trackless.require.failed') {
												setIsCheckingInputError(true)
											} else if (error.errorCode === 'trackless.user.usernameTaken') {
												setIsCheckingInputError(true)
												setIsUsernameTaken(true)
											}
										}
									})
							}
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

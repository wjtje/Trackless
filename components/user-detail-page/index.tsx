import {MenuItem} from '@material-ui/core'
import {useSnackbar} from 'notistack'
import React, {useState} from 'react'
import TracklessUser from '../../scripts/classes/trackless-user'
import AppError from '../../scripts/error/app-error'
import useGroups from '../../scripts/hooks/use-group'
import useUsers from '../../scripts/hooks/use-users'
import DetailObject from '../detail-page/detail-object'
import {inputValueCheckString} from '../detail-page/detail-object/input-value-check'

interface props {
	currentSelectedUser: TracklessUser;
	onClose: () => void;
}

const UserDetailPage = ({currentSelectedUser, onClose}: props) => {
	const {groups} = useGroups()
	const {enqueueSnackbar} = useSnackbar()
	const {addUser, updateUser} = useUsers()

	const [isCheckingInputError, setIsCheckingInputError] = useState(false)
	const [isUsernameTaken, setIsUsernameTaken] = useState(false)

	return (
		<DetailObject
			editObject={currentSelectedUser}
			isCheckError={isCheckingInputError}
			// The input fields
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
						return inputValueCheckString('username')(inputValues) || isUsernameTaken
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
			// Hide the pannel and stop tracking error's
			onClose={() => {
				onClose()
				setIsCheckingInputError(false)
				setIsUsernameTaken(false)
			}}
			// Save the changes
			onSave={async (editObject, inputValues, saveType) => {
				try {
					if (saveType === 'save') {
						if (await addUser(inputValues)) {
							onClose()
							setIsCheckingInputError(false)
							setIsUsernameTaken(false)
						}
					} else if (await updateUser({
						editUser: editObject,
						...inputValues
					})) {
						onClose()
						setIsCheckingInputError(false)
						setIsUsernameTaken(false)
					}
				} catch (error: unknown) {
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
				}
			}}
		/>
	)
}

export default UserDetailPage

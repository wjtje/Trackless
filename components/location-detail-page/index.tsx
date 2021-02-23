import {MenuItem} from '@material-ui/core'
import {useSnackbar} from 'notistack'
import React, {useState} from 'react'
import TracklessLocation from '../../scripts/classes/trackless-location'
import AppError from '../../scripts/error/app-error'
import useLocations from '../../scripts/hooks/use-locations'
import DetailObject from '../detail-page/detail-object'
import {inputValueCheckString} from '../detail-page/detail-object/input-value-check'

interface props {
	currentSelectedLocation: TracklessLocation;
	onClose: () => void;
}

const LocationDetailPage = ({currentSelectedLocation, onClose}: props) => {
	const {enqueueSnackbar} = useSnackbar()
	const {addLocation, updateLocation, deleteLocation} = useLocations(true)

	const [isCheckingInputError, setIsCheckingInputError] = useState(false)

	return (
		<DetailObject
			editObject={currentSelectedLocation}
			isCheckError={isCheckingInputError}
			objectName="location"
			// The input fields
			properties={{
				place: {
					label: 'Place',
					type: 'string',
					inputCheck: inputValueCheckString('place')
				},
				name: {
					label: 'Name',
					type: 'string',
					inputCheck: inputValueCheckString('name')
				},
				id: {
					label: 'ID',
					type: 'string',
					inputCheck: inputValueCheckString('id')
				},
				hidden: {
					label: 'Visibility',
					menuItems: [
						<MenuItem
							key={0}
							value="0"
						>
							Visable
						</MenuItem>,
						<MenuItem
							key={1}
							value="1"
						>
							Hidden
						</MenuItem>
					],
					inputCheck: inputValueCheckString('hidden'),
					editOnly: true
				}
			}}
			// Hide the pannel and stop tracking error's
			onClose={() => {
				onClose()
				setIsCheckingInputError(false)
			}}
			// Save the changes
			onSave={async (editObject, inputValues, saveType) => {
				try {
					if (saveType === 'save') {
						// Create a new user
						if (await addLocation(inputValues)) {
							onClose()
							setIsCheckingInputError(false)
						}
					} else if (saveType === 'update') {
						// Update a user
						if (await updateLocation({
							editLocation: editObject,
							...inputValues
						})) {
							onClose()
							setIsCheckingInputError(false)
						}
					} else if (saveType === 'delete' && await deleteLocation(editObject)) {
						// Remove a user
						onClose()
						setIsCheckingInputError(false)
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
						}
					}
				}
			}}
		/>
	)
}

export default LocationDetailPage

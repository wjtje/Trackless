import {Button, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, MenuItem, TextField, Typography} from '@material-ui/core'
import {red} from '@material-ui/core/colors'
import {useSnackbar} from 'notistack'
import React, {useEffect, useState} from 'react'
import TracklessLocation from '../../scripts/classes/trackless-location'
import useLocations from '../../scripts/hooks/use-locations'
import PageFade from '../page-fade'

const useStyles = makeStyles(theme =>
	createStyles({
		locationDetailContainer: {
			width: '100%',
			height: '100%',
			padding: theme.spacing(2),
			[theme.breakpoints.down('sm')]: {
				width: '100%'
			}
		},
		textInput: {
			marginTop: theme.spacing(2)
		},
		actionButtons: {
			display: 'flex',
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
			justifyContent: 'right'
		}
	})
)

interface props {
	/**
	 * This event is fired every time the dialog needs to be closed
	 */
	onClose: () => void;
	/**
	 * This defines the location that will be edited
	 */
	editLocation?: TracklessLocation | null;
}

/**
 * A way for the user to add more location to the system
 */
const LocationAdd = ({onClose, editLocation}: props) => {
	const classes = useStyles()
	const {enqueueSnackbar} = useSnackbar()
	const {addLocation, updateLocation, deleteLocation} = useLocations(true)

	const [showWarning, setShowWarning] = useState(false)
	const [showDialog, setShowDialog] = useState(false)
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)

	const [place, setPlace] = useState('')
	const [name, setName] = useState('')
	const [id, setId] = useState('')
	const [hidden, setHidden] = useState(0)

	// Update the states when the editLocation changes
	useEffect(() => {
		if (editLocation !== null) {
			setPlace(editLocation.place)
			setName(editLocation.name)
			setId(editLocation.id)
			setHidden(editLocation.hidden)
		}
	}, [editLocation])

	/**
	 * This event is fired when the users saves a location
	 */
	const onSave = () => {
		// Check if the values are valid
		if (place === '' || name === '' || place === '') {
			enqueueSnackbar('Not all required fields are entered', {
				variant: 'warning'
			})
			setShowWarning(true)
		} else if ((editLocation === null)) {
			// Save the data
			void addLocation(place, name, id)
				.then(() => {
					onClose()
				})
		} else {
			// Update the data
			void updateLocation({
				locationID: editLocation.locationID,
				place,
				name,
				id,
				hidden
			})
				.then(() => {
					onClose()
				})
		}
	}

	/**
	 * This event is fired when the user closes the location without saving
	 */
	const onExit = () => {
		// Check for unsaved changes
		if (editLocation === null && (
			place !== '' ||
			name !== '' ||
			id !== ''
		)) {
			setShowDialog(true)
		} else if (editLocation !== null && (
			editLocation?.place !== place ||
			editLocation?.name !== name ||
			editLocation?.id !== id ||
			editLocation?.hidden !== hidden
		)) {
			setShowDialog(true)
		} else {
			// No onsaved changes
			onClose()
		}
	}

	/**
	 * This event is fired when the user deletes a location
	 */
	const onDelete = () => {
		// Close the dialog
		setShowDeleteDialog(false)

		// Delete the location
		void deleteLocation(editLocation.locationID)
			.then(() => {
				onClose()
			})
	}

	return (
		<PageFade>
			<div
				className={classes.locationDetailContainer}
			>
				<Typography variant="h5">
					{editLocation === null ? 'Add location' : 'Edit location'}
				</Typography>

				<TextField
					fullWidth
					required
					className={classes.textInput}
					label="Place"
					variant="outlined"
					value={place}
					error={place === '' && showWarning}
					onChange={event => {
						setPlace(event.target.value)
					}}
				/>
				<TextField
					fullWidth
					required
					className={classes.textInput}
					label="Name"
					variant="outlined"
					value={name}
					error={name === '' && showWarning}
					onChange={event => {
						setName(event.target.value)
					}}
				/>
				<TextField
					fullWidth
					required
					className={classes.textInput}
					label="ID"
					variant="outlined"
					value={id}
					error={id === '' && showWarning}
					onChange={event => {
						setId(event.target.value)
					}}
				/>
				{
					editLocation === null ? null : (
						<TextField
							fullWidth
							required
							select
							className={classes.textInput}
							label="Visibility"
							variant="outlined"
							value={hidden}
							onChange={event => {
								setHidden(Number(event.target.value))
							}}
						>
							<MenuItem value={0}>
								Visable
							</MenuItem>
							<MenuItem value={1}>
								Hidden
							</MenuItem>
						</TextField>
					)
				}

				<div className={classes.actionButtons}>
					<Button onClick={onExit}>Exit</Button>
					{
						editLocation === null ?
							null :
							<Button
								color="secondary" onClick={() => {
									setShowDeleteDialog(true)
								}}
							>
								Delete
							</Button>
					}
					<Button color="primary" onClick={onSave}>Save</Button>
				</div>

				{/* Warning dialogs */}
				<Dialog
					open={showDialog}
				>
					<DialogTitle>Unsaved changes</DialogTitle>
					<DialogContent>
						<DialogContentText>
							There are unsaved changed on this page
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => {
								onClose()
								setShowDialog(false)
							}}
						>
							Leave
						</Button>
						<Button
							onClick={() => {
								setShowDialog(false)
							}}
						>
							Stay
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={showDeleteDialog}
				>
					<DialogTitle>Delete a location</DialogTitle>
					<DialogContent>
						<DialogContentText>
							You are at the point of deleting a location.
							This cann&apos;t be undone.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={onDelete}
						>
							Delete
						</Button>
						<Button
							onClick={() => {
								setShowDeleteDialog(false)
							}}
						>
							Stay
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</PageFade>
	)
}

export default LocationAdd

import {Button, createStyles, makeStyles, TextField, Typography} from '@material-ui/core'
import {red} from '@material-ui/core/colors'
import {useSnackbar} from 'notistack'
import React, {useState} from 'react'
import TracklessLocation from '../../scripts/classes/trackless-location'
import useLocations from '../../scripts/hooks/use-locations'
import PageFade from '../page-fade'

const useStyles = makeStyles(theme =>
	createStyles({
		locationDetailContainer: {
			width: '50%',
			height: '100%',
			float: 'right',
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
	editLocation?: TracklessLocation;
}

/**
 * A way for the user to add more location to the system
 */
const LocationAdd = ({onClose, editLocation}: props) => {
	const classes = useStyles()
	const {enqueueSnackbar} = useSnackbar()
	const {addLocation} = useLocations()

	const [showWarning, setShowWarning] = useState(false)

	const [place, setPlace] = useState('')
	const [name, setName] = useState('')
	const [id, setId] = useState('')

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
		} else {
			// Save the data
			addLocation(name, place, id)
			onClose()
		}
	}

	/**
	 * This event is fired when the user closes the location without saving
	 */
	const onExit = () => {
		onClose()
	}

	/**
	 * This event is fired when the user deletes a location
	 */
	const onDelete = () => {
		onClose()
	}

	return (
		<PageFade>
			<div
				className={classes.locationDetailContainer}
			>
				<Typography variant="h5">
					{editLocation === undefined ? 'Add location' : 'Edit location'}
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

				<div className={classes.actionButtons}>
					<Button onClick={onExit}>Exit</Button>
					{editLocation === undefined ? null : <Button color="secondary" onClick={onDelete}>Delete</Button>}
					<Button color="primary" onClick={onSave}>Save</Button>
				</div>
			</div>
		</PageFade>
	)
}

export default LocationAdd

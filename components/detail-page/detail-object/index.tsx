import {Button, createStyles, makeStyles, Typography} from '@material-ui/core'
import React, {useEffect, useRef, useState} from 'react'
import PageFade from '../../page-fade'
import DetailObjectField, {detailObjectField} from './detail-object-field'
import UnsavedDialog from './unsaved-dialog'

// Custom styles used by this component
const useStyles = makeStyles(theme =>
	createStyles({
		root: {
			width: '100%',
			height: '100%',
			padding: theme.spacing(2)
		},
		actionButtons: {
			display: 'flex',
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
			justifyContent: 'right'
		}
	})
)

/**
 * A detail object will handle the add and edit page of detail page
 *
 * You need te define the properties
 */
const DetailObject = <editObjectType, propertiesKey extends string>(
	{onClose, properties, editObject, onSave, isCheckError}: {
		/**
		 * This function is run when the user clickes on the close button
		 */
		onClose: () => void;
		/**
		 * Properties for creating and editing objects
		 */
		properties: Record<propertiesKey, detailObjectField<propertiesKey>>;
		/**
		 * This is the object you want to edit
		 */
		editObject: editObjectType;
		/**
		 * This function is run when the object needs saving or updating
		 */
		onSave: (editObject: editObjectType, inputValues: Record<propertiesKey, string>, saveType: 'save' | 'update') => void;
		/**
		 * This defines is the input error's are visable to the end user
		 */
		isCheckError: boolean;
	}
) => {
	const classes = useStyles()

	// State for all the input's
	const [inputValues, setInputValues] = useState<Record<string, string>>(editObject ?? {})

	// State for tracking changes made
	const [madeChanges, setMadeChanges] = useState(false)

	// States and function for unsavedDialog
	const [unsavedDialogOpen, setUnsavedDialogOpen] = useState(false)
	const unsavedDialogLeave = useRef(() => {
		// This will hide the dialog and close the page
		setUnsavedDialogOpen(false)
		onClose()
	})

	const unsavedDialogStay = () => {
		// This will hide the dialog
		setUnsavedDialogOpen(false)
	}

	// UseEffect for updating the editObject
	useEffect(
		() => {
			if (madeChanges) {
				// Change the leave function
				unsavedDialogLeave.current = () => {
					setUnsavedDialogOpen(false)
					setInputValues(editObject ?? {})
				}

				// Show the dialog
				setUnsavedDialogOpen(true)
			} else {
				setInputValues(editObject ?? {})
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[editObject]
	)

	// Functions for events
	const onCloseBtn = () => {
		if (madeChanges) {
			// Change the leave function
			unsavedDialogLeave.current = () => {
				setUnsavedDialogOpen(false)
				onClose()
			}

			// Show the dialog
			setUnsavedDialogOpen(true)
		} else {
			setUnsavedDialogOpen(false)
			onClose()
		}
	}

	return (
		<PageFade>
			<div className={classes.root}>
				{/* The title */}
				<Typography variant="h5">
					{editObject === null ? 'Add object' : 'Edit object'}
				</Typography>

				{/* The input fields */}
				{
					Object.entries<detailObjectField<propertiesKey>>(properties).map(([key, property]) => (
						<DetailObjectField
							key={key}
							label={property.label}
							menuItems={property.menuItems}
							type={property.type}
							error={property.inputCheck(inputValues) && isCheckError}
							value={inputValues[key] ?? ''}
							onChange={value => {
								// Save the changes made
								setMadeChanges(true)
								setInputValues({
									...inputValues,
									[key]: value
								})
							}}
						/>
					))
				}

				{/* Buttons */}
				<div className={classes.actionButtons}>
					<Button onClick={onCloseBtn}>Close</Button>
					<Button
						onClick={() => {
							if (editObject === null) {
								onSave(editObject, inputValues, 'save')
							} else {
								onSave(editObject, inputValues, 'update')
							}
						}}
					>
						Save
					</Button>
				</div>

				{/* Dialogs */}
				<UnsavedDialog
					open={unsavedDialogOpen}
					onLeave={unsavedDialogLeave.current}
					onStay={unsavedDialogStay}
				/>
			</div>
		</PageFade>
	)
}

export default DetailObject

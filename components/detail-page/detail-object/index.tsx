import {Button, createStyles, makeStyles, Typography} from '@material-ui/core'
import {SettingsInputAntennaTwoTone} from '@material-ui/icons'
import React, {useEffect, useState} from 'react'
import PageFade from '../../page-fade'
import DetailObjectField, {detailObjectField} from './detail-object-field'

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

interface props {
	/**
	 * This event is fired every time the dialog needs to be closed
	 */
	onClose: () => void;
	/**
	 * Properties required for create a new object
	 */
	newProperties: Record<string, detailObjectField>;
	/**
	 * TODO
	 */
	editObject: any;
}

/**
 * A detail object will handle the add and edit page of detail page
 *
 * You need te define the newProperties and editProperties
 */
const DetailObject = ({onClose, newProperties, editObject}: props) => {
	const classes = useStyles()
	const [inputValues, setInputValues] = useState<Record<string, unknown>>(editObject ?? {})

	useEffect(
		() => {
			// TODO: check for unsaved changes
			setInputValues(editObject ?? {})
		},
		[editObject]
	)

	return (
		<PageFade>
			<div className={classes.root}>
				{/* The title */}
				<Typography variant="h5">
					{editObject === null ? 'Add object' : 'Edit object'}
				</Typography>

				{/* The input fields */}
				{
					Object.entries(newProperties).map(([key, property]) => (
						<DetailObjectField
							key={key}
							{...property}
							value={inputValues[key] ?? ''}
							onChange={value => {
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
					<Button onClick={onClose}>Close</Button>
				</div>
			</div>
		</PageFade>
	)
}

export default DetailObject

import {createStyles, makeStyles, TextField} from '@material-ui/core'
import React from 'react'

// Custom styles used by this component
const useStyles = makeStyles(theme =>
	createStyles({
		textField: {
			marginTop: theme.spacing(2)
		}
	})
)

export interface detailObjectField {
	/**
	 * The label on the textfield shown to the user
	 */
	label: string;
	/**
	 * The type of the input field
	 */
	type: 'string' | 'number' | 'password';
}

interface props {
	label: string;
	type: 'string' | 'number' | 'password';
	value: any;
	onChange: (newValue: any) => void;
}

const DetailObjectField = ({label, type, value, onChange}: props) => {
	const classes = useStyles()

	return (
		<TextField
			fullWidth
			required
			className={classes.textField}
			label={label}
			type={type}
			value={value}
			onChange={event => {
				onChange(event.target.value)
			}}
		/>
	)
}

export default DetailObjectField

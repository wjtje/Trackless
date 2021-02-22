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

export interface detailObjectField<propertiesKey extends string> {
	/**
	 * The label on the textfield shown to the user
	 */
	label: string;
	/**
	 * The type of the input field
	 */
	type?: 'string' | 'number' | 'password';
	/**
	 * Put your menuItems here if you want to display a list
	 */
	menuItems?: JSX.Element[];
	/**
	 * This function will check if the input value is valid
	 */
	inputCheck: (inputValues: Record<propertiesKey, unknown>) => boolean;
}

interface props {
	label: string;
	type?: 'string' | 'number' | 'password';
	menuItems?: JSX.Element[];
	value: any;
	onChange: (newValue: any) => void;
	error: boolean;
}

const DetailObjectField = ({label, type, value, onChange, menuItems = [], error}: props) => {
	const classes = useStyles()

	return (
		<TextField
			fullWidth
			required
			variant="outlined"
			className={classes.textField}
			label={label}
			type={type}
			error={error}
			select={menuItems?.length !== 0}
			value={value}
			onChange={event => {
				onChange(event.target.value)
			}}
		>
			{menuItems}
		</TextField>
	)
}

export default DetailObjectField

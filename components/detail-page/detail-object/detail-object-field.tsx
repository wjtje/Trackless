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
	type?: 'string' | 'number' | 'password';
	/**
	 * Put your menuItems here if you want to display a list
	 */
	menuItems?: JSX.Element[];
}

interface props {
	label: string;
	type?: 'string' | 'number' | 'password';
	menuItems?: JSX.Element[];
	value: any;
	onChange: (newValue: any) => void;
}

const DetailObjectField = ({label, type, value, onChange, menuItems = []}: props) => {
	const classes = useStyles()

	return (
		<TextField
			fullWidth
			required
			variant="outlined"
			className={classes.textField}
			label={label}
			type={type}
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

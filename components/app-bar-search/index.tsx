import {makeStyles, Theme, createStyles, fade, InputBase} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'
import React, {useState} from 'react'
import SearchIcon from '@material-ui/icons/Search'

// Create a the custom styles needed for this component
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		autoSearch: {
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(3),
				width: 'auto'
			}
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25)
			},
			marginRight: theme.spacing(2),
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(3),
				width: 'auto'
			}
		},
		searchIcon: {
			padding: theme.spacing(0, 2),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
		inputRoot: {
			color: 'inherit'
		},
		inputInput: {
			padding: theme.spacing(1, 1, 1, 0),
			// Vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('md')]: {
				width: '20ch'
			}
		}
	})
)

/**
 * A custom scroll bar that you can use inside a AppBar component
 *
 * Options is an array of any type, the function optionLable is used to get the lable of your object.
 * OnSelect will run when the user selects a object or if the autoComplete is closed
 */
// eslint-disable-next-line @typescript-eslint/comma-dangle
const AppBarSearch = <T,>(props: {
	options: T[];
	optionLabel: (option: T) => string;
	optionSelected: (option: T, value: T) => boolean;
	onSelect: (value: T) => void;
}) => {
	const classes = useStyles()

	const [highlight, setHighlight] = useState<T>()

	return (
		<Autocomplete
			autoHighlight
			fullWidth
			clearOnBlur
			className={classes.autoSearch}
			options={props.options}
			getOptionLabel={props.optionLabel}
			getOptionSelected={props.optionSelected}
			renderInput={parameters => (
				<div
					ref={parameters.InputProps.ref}
					className={classes.search}
				>
					<div className={classes.searchIcon}>
						<SearchIcon/>
					</div>
					<InputBase
						placeholder="Search…"
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput
						}}
						inputProps={{
							...parameters.inputProps,
							'aria-label': 'search'
						}}
					/>
				</div>
			)}
			// Update the highlighted option
			onHighlightChange={(event, option) => {
				setHighlight(option)
			}}
			// Run code when it is closed and there is a highlight
			onClose={(event, reason) => {
				// Check if the user selected a object
				if (reason === 'select-option') {
					props.onSelect(highlight)
				} else {
					// No object selected return null
					props.onSelect(null)
				}
			}}
		/>
	)
}

export default AppBarSearch

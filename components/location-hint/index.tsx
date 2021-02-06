import {createStyles, makeStyles, Typography} from '@material-ui/core'
import React from 'react'
import clsns from 'classnames'
import PageFade from '../page-fade'

const useStyles = makeStyles(theme =>
	createStyles({
		locationDetailContainer: {
			width: '50%',
			height: '100%',
			float: 'right',
			padding: theme.spacing(2),
			[theme.breakpoints.down('sm')]: {
				display: 'none !important'
			}
		},
		locationDetailEmptyContainer: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		},
		contentContainer: {
			padding: `0 ${theme.spacing(2)}px`
		},
		emptyText: {
			textAlign: 'center'
		}
	})
)

/**
 * Show a hint to the user to what todo next
 */
const LocationHint = () => {
	const classes = useStyles()

	return (
		<PageFade>
			<div
				className={clsns(
					classes.locationDetailContainer,
					classes.locationDetailEmptyContainer
				)}
			>
				<div className={classes.contentContainer}>
					<Typography variant="h5" className={classes.emptyText}>
						No location selected
					</Typography>
					<Typography variant="body2" className={classes.emptyText}>
						Select a location from the list or add a new one
					</Typography>
				</div>
			</div>
		</PageFade>
	)
}

export default LocationHint

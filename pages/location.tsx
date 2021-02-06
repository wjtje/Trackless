import {Button, createStyles, Fab, List, ListItem, ListItemText, makeStyles, TextField, Typography, Zoom} from '@material-ui/core'
import {Add as AddIcon} from '@material-ui/icons'
import {AnimatePresence, useIsPresent} from 'framer-motion'
import React, {useState} from 'react'
import PageFade from '../components/page-fade'
import useLocations from '../scripts/hooks/use-locations'
import clsns from 'classnames'
import TracklessLocation from '../scripts/classes/trackless-location'
import LocationHint from '../components/location-hint'
import LocationAdd from '../components/location-add'

export const locationPageAccess = [
	'trackless.location.read',
	'trackless.location.create'
]

// Custom styles used on this page
const useStyles = makeStyles(theme =>
	createStyles({
		fab: {
			position: 'absolute',
			bottom: theme.spacing(2),
			right: theme.spacing(2),
			margin: theme.spacing(1)
		},
		extendedIcon: {
			marginRight: theme.spacing(1)
		},
		locationListContainer: {
			width: '50%',
			height: '100%',
			float: 'left',
			padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
			overflowY: 'scroll',
			[theme.breakpoints.down('sm')]: {
				width: '100%'
			}
		},
		locationListContainerHidden: {
			[theme.breakpoints.down('sm')]: {
				display: 'none'
			}
		}
	})
)

/**
 * A page to see, edit and add location to the system
 */
const Location = () => {
	const classes = useStyles()
	const isPresent = useIsPresent()
	const {locations} = useLocations()

	const [currentLocation, setCurrentLocation] = useState<TracklessLocation>(null)
	const [addLocation, setAddLocation] = useState(false)

	/**
	 * This value is true if the user is editing a location
	 */
	const isEditing = addLocation || currentLocation !== null

	return (
		<>
			<PageFade>
				{/* Location list */}
				<div
					className={clsns(
						classes.locationListContainer,
						{
							[classes.locationListContainerHidden]: isEditing
						}
					)}
				>
					<List>
						{locations?.map(location => (
							<ListItem
								key={location.locationID}
								button
							>
								<ListItemText primary={location.fullName} secondary={location.id}/>
							</ListItem>
						))}
					</List>
				</div>

				{/* Show the hint or the edit dialog to the user */}
				<AnimatePresence exitBeforeEnter>
					{
						isEditing ?
							<LocationAdd
								key="add"
								onClose={() => {
									setAddLocation(false)
								}}
							/> :
							<LocationHint key="hint"/>
					}
				</AnimatePresence>
			</PageFade>

			<Zoom in={isPresent && !addLocation}>
				<Fab
					className={classes.fab}
					color="secondary"
					variant="extended"
					onClick={() => {
						setAddLocation(true)
					}}
				>
					<AddIcon className={classes.extendedIcon}/>
					Add
				</Fab>
			</Zoom>
		</>
	)
}

export default Location

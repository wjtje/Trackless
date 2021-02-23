import {createStyles, Fab, List, ListItem, ListItemText, makeStyles, Zoom} from '@material-ui/core'
import {Add as AddIcon} from '@material-ui/icons'
import {useIsPresent} from 'framer-motion'
import React, {useState} from 'react'
import PageFade from '../components/page-fade'
import useLocations from '../scripts/hooks/use-locations'
import clsns from 'classnames'
import TracklessLocation from '../scripts/classes/trackless-location'
import DetailPage from '../components/detail-page'
import DetailPane from '../components/detail-page/detail-pane'
import ListPane from '../components/detail-page/list-pane'
import SearchableList from '../components/searchable-list'
import LocationDetailPage from '../components/location-detail-page'

export const locationPageAccess = [
	'trackless.location.read',
	'trackless.location.create',
	'trackless.location.edit',
	'trackless.location.remove'
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
		locationListDetail: {
			height: '100%',
			width: '50%',
			float: 'right',
			overflowY: 'auto'
		},
		locationListContainerHidden: {
			[theme.breakpoints.down('sm')]: {
				display: 'none'
			}
		},
		listItemHidden: {
			color: '#E25141'
		}
	})
)

/**
 * A page to see, edit and add location to the system
 */
const Location = () => {
	const classes = useStyles()
	const isPresent = useIsPresent()
	const {locations} = useLocations(true)

	const [currentLocation, setCurrentLocation] = useState<TracklessLocation>(null)
	const [addLocation, setAddLocation] = useState(false)

	/**
	 * This value is true if the user is editing a location
	 */
	const isEditing = addLocation || currentLocation !== null

	console.log(`Location page edit: ${String(isEditing)}`)

	return (
		<>
			<PageFade>
				<DetailPage
					hintTitle="No location selected"
					hintSubtext="Select a location from the list or add a new one"
					detailActive={isEditing}
				>
					<ListPane>
						<SearchableList<TracklessLocation>
							list={locations}
							listProperties={{
								key: 'locationID',
								primaryText: 'fullName',
								secondaryText: 'id'
							}}
							className={item => clsns({[classes.listItemHidden]: item.hidden === 1})}
							onClick={setCurrentLocation}
						/>
					</ListPane>
					<DetailPane>
						<LocationDetailPage
							currentSelectedLocation={currentLocation}
							onClose={() => {
								setAddLocation(false)
								setCurrentLocation(null)
							}}
						/>
					</DetailPane>
				</DetailPage>
			</PageFade>

			<Zoom in={isPresent && !isEditing}>
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

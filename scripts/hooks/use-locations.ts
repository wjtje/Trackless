import {useSnackbar} from 'notistack'
import {useContext, useEffect} from 'react'
import useSWR from 'swr'
import {ServerContext} from '../../pages/_app'
import TracklessLocation from '../classes/trackless-location'
import errorState from '../error/error-state'
import HttpRequestError from '../error/http-request-error'

/**
 * Get all location on the server sorted by place and name
 */
function useLocations(hidden: boolean): {
	/**
	 * This array contains all the data
	 */
	locations: TracklessLocation[];

	/**
	 * This value is true if the current data is outdated
	 */
	isLoading: boolean;

	/**
	 * This value is true if the current data is outdated
	 */
	error: HttpRequestError;

	/**
	 * This function will send the data of this new location to the server,
	 * makes sure it saved and refresh the internal list
	 */
	addLocation: ({place, name, id}: {place: string; name: string; id: string}) => Promise<boolean>;

	/**
	 * This function will update a exsisting location with new data
	 */
	updateLocation: ({editLocation, place, name, id, hidden}: {
		editLocation: TracklessLocation;
		place: string;
		name: string;
		id: string;
		hidden: string;
	}) => Promise<boolean>;

	/**
	 * This function will delete a location from the server
	 */
	deleteLocation: (location: TracklessLocation) => Promise<boolean>;
} {
	// Connect to global hooks
	const {apiKey, serverUrl} = useContext(ServerContext)
	const {enqueueSnackbar, closeSnackbar} = useSnackbar()

	// Get the data from the server
	const {data, error, isValidating, mutate} = useSWR(hidden ? '/location?sort=place,name&hidden' : '/location?sort=place,name')

	// Check for any error
	useEffect(() => {
		if (error !== undefined) {
			// This key makes sure that only one message is shown every minute
			const key = `${new Date(Date.now()).getMinutes()}-location`
			errorState(key, error, enqueueSnackbar)
		}
	}, [error, enqueueSnackbar])

	// Parse the data
	const locations: TracklessLocation[] = []

	if (Array.isArray(data)) {
		data.forEach(element => {
			locations.push(new TracklessLocation(element))
		})
	}

	const addLocation = async ({place, name, id}: {place: string; name: string; id: string}): Promise<boolean> => {
		// Show a snackbar
		const saving = enqueueSnackbar('Saving')

		try {
			// Create a new user
			await TracklessLocation.createLocation({
				name,
				place,
				id,
				serverUrl,
				apiKey
			})

			// Update the list
			await mutate()

			// Show the user its done
			enqueueSnackbar('Saved!', {variant: 'success'})

			return true
		} catch (error: unknown) {
			throw error
		} finally {
			// Always close the snackbar
			closeSnackbar(saving)
		}
	}

	const updateLocation = async ({editLocation, place, name, id, hidden}: {
		editLocation: TracklessLocation;
		place: string;
		name: string;
		id: string;
		hidden: string;
	}): Promise<boolean> => {
		// Show a saving snackbar
		const saving = enqueueSnackbar('Saving')

		try {
			// Update the user
			await editLocation.updateLocation({
				place,
				name,
				id,
				hidden,
				serverUrl,
				apiKey
			})

			// Update the user List
			await mutate()

			// Show the user it's saved
			enqueueSnackbar('Saved!', {variant: 'success'})

			return true
		} catch (error: unknown) {
			// Send any error forward
			throw error
		} finally {
			// Always close the snackbar
			closeSnackbar(saving)
		}
	}

	const deleteLocation = async (location: TracklessLocation): Promise<boolean> => {
		// Show a removing snackbar
		const removing = enqueueSnackbar('Removing')

		try {
			// Update the user
			await location.deleteLocation({
				serverUrl,
				apiKey
			})

			// Update the user List
			await mutate()

			// Show the user it's saved
			enqueueSnackbar('Removed', {variant: 'success'})

			return true
		} catch (error: unknown) {
			// Send any error forward
			throw error
		} finally {
			// Always close the snackbar
			closeSnackbar(removing)
		}
	}

	return {
		locations,
		isLoading: isValidating,
		error,
		addLocation,
		updateLocation,
		deleteLocation
	}
}

export default useLocations

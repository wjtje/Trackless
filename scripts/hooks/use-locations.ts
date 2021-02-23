import {useSnackbar} from 'notistack'
import {useContext, useEffect} from 'react'
import useSWR from 'swr'
import {ServerContext} from '../../pages/_app'
import TracklessLocation from '../classes/trackless-location'
import errorState from '../error/error-state'
import HttpRequestError from '../error/http-request-error'

interface updateProps {
	locationID: number;
	place: string;
	name: string;
	id: string;
	hidden: number;
}

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
	 *
	 * @param place The place of the new location
	 * @param name The name of the new location
	 * @param id The internal ID of the new location
	 */
	addLocation: (place: string, name: string, id: string) => Promise<void>;

	/**
	 * This function will update a exsisting location with new data
	 */
	updateLocation: (values: updateProps) => Promise<void>;

	/**
	 * This function will delete a location from the server
	 */
	deleteLocation: (locationID: number) => Promise<void>;
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

	const addLocation = async (place: string, name: string, id: string): Promise<void> => {
		console.log('Adding a new location')

		return new Promise((resolve, reject) => {
			// Show a saving snackbar
			const saving = enqueueSnackbar('Saving')

			// Send the data th the server
			fetch(`${serverUrl}/location`, {
				method: 'POST',
				body: JSON.stringify({
					name,
					place,
					id
				}),
				headers: {
					Authorization: `Bearer ${apiKey}`,
					'Content-Type': 'application/json'
				}
			})
				.then(async response => {
					// Handle the request
					await handleRequest(response, saving, 201, resolve)
				})
				.catch(error => {
					errorState('location', error, enqueueSnackbar)
					reject()
				})
		})
	}

	const updateLocation = async ({locationID, place, name, id, hidden}: {
		locationID: number; place: string; name: string; id: string; hidden: number;
	}): Promise<void> => {
		console.log('Updating a location')

		return new Promise((resolve, reject) => {
			// Show a saving snackbar
			const saving = enqueueSnackbar('Saving')

			// Send the data to the server
			fetch(`${serverUrl}/location/${locationID}`, {
				method: 'PATCH',
				body: JSON.stringify({
					name,
					place,
					id,
					hidden
				}),
				headers: {
					Authorization: `Bearer ${apiKey}`,
					'Content-Type': 'application/json'
				}
			})
				.then(async response => {
					// Handle the request
					await handleRequest(response, saving, 200, resolve)
				})
				.catch(error => {
					errorState('location', error, enqueueSnackbar)
					reject()
				})
		})
	}

	const deleteLocation = async (locationID: number): Promise<void> => {
		console.log('Deleting a location')

		return new Promise((resolve, reject) => {
			// Show a snackbar
			const deleting = enqueueSnackbar('Deleting')

			// Send the request to the server
			fetch(`${serverUrl}/location/${locationID}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${apiKey}`,
					'Content-Type': 'application/json'
				}
			})
				.then(async response => {
					// Handle the request
					await handleRequest(response, deleting, 200, resolve)
				})
				.catch(error => {
					errorState('location', error, enqueueSnackbar)
					reject()
				})
		})
	}

	return {
		locations,
		isLoading: isValidating,
		error,
		addLocation,
		updateLocation,
		deleteLocation
	}

	/**
	 * This function will handle a request
	 * @param response
	 * @param snackbar The snackbar to close
	 * @param resolve	The function to run to resolve it
	 * @param status The status code thats correct
	 */
	async function handleRequest(response: Response, snackbar, status: number, resolve: (value: void | PromiseLike<void>) => void) {
		const result = await response.json()

		// Test for any error's
		if (response.status === status) {
			// Saved !
			console.log(result)

			// Update the list
			updateLocations(snackbar)

			// Done!
			resolve()
		} else {
			// Something went wrong
			closeSnackbar(snackbar)
			throw new HttpRequestError(response.status, result)
		}
	}

	/**
	 * This function full close a snackbar, update the list and then show a new one
	 */
	function updateLocations(saving) {
		void mutate().then(_ => {
			// Show a message to the user
			closeSnackbar(saving)
			enqueueSnackbar('Saved!', {
				variant: 'success'
			})
		})
	}
}

export default useLocations

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
function useLocations(): {
	/**
	 * This array contains all the data
	 */
	locations: TracklessLocation[];

	/**
	 * This value is true if the current data is outdated
	 */
	isLoading: boolean;

	/**
	 * This value contains any error's
	 */
	error: HttpRequestError;

	/**
	 * This function can be used to add a new location to the system
	 */
	addLocation: (name: string, place: string, id: string) => void;
} {
	// Connect to global hooks
	const {apiKey, serverUrl} = useContext(ServerContext)
	const {enqueueSnackbar, closeSnackbar} = useSnackbar()

	// Get the data from the server
	const {data, error, isValidating, mutate} = useSWR('/location?sort=place,name')

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

	// AddLocation
	const addLocation = (name: string, place: string, id: string) => {
		// Show a saving snackbar
		const saving = enqueueSnackbar('Saving')

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
				const result = await response.json()

				// Test for any errors
				if (response.status === 201) {
					// Saved!
					console.log(result?.locationID)

					// Update the list
					void mutate().then(_ => {
						// Show a message to the user
						closeSnackbar(saving)
						enqueueSnackbar('Saved!', {
							variant: 'success'
						})
					})
				} else {
					// Something went wrong
					closeSnackbar(saving)
					throw new HttpRequestError(response.status, result)
				}
			})
			.catch(error => {
				errorState('location', error, enqueueSnackbar)
			})
	}

	return {
		locations,
		isLoading: isValidating,
		error,
		addLocation
	}
}

export default useLocations

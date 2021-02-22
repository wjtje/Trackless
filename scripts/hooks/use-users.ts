import {useSnackbar} from 'notistack'
import {useContext, useEffect} from 'react'
import useSWR from 'swr'
import {ServerContext} from '../../pages/_app'
import TracklessUser from '../classes/trackless-user'
import errorState from '../error/error-state'
import HttpRequestError from '../error/http-request-error'

/**
 * Get all users on the server sorted by firstname and lastname
 */
function useUsers(): {
	/**
	 * This array contains all the data
	 */
	users: TracklessUser[];

	/**
	 * This value is true if the current data is outdated
	 */
	isLoading: boolean;

	/**
	 * This value is true if the current data is outdated
	 */
	error: HttpRequestError;

	/**
	 * This function will add a new location to the server
	 */
	addUser: ({
		firstname,
		lastname,
		username,
		groupID,
		password
	}) => Promise<void>;
} {
	// Connect to global hooks
	const {apiKey, serverUrl} = useContext(ServerContext)
	const {enqueueSnackbar, closeSnackbar} = useSnackbar()

	// Get the data from the server
	const {data, error, mutate} = useSWR('/user?sort=firstname,lastname')

	// Check for any error
	useEffect(() => {
		if (error !== undefined) {
			// This key makes sure that only one message is shown every minute
			const key = `${new Date(Date.now()).getMinutes()}-users`
			errorState(key, error, enqueueSnackbar)
		}
	}, [error, enqueueSnackbar])

	// Parse the data
	const users: TracklessUser[] = []

	if (Array.isArray(data)) {
		data.forEach(element => {
			users.push(new TracklessUser(element))
		})
	}

	const addUser = async ({firstname, lastname, username, groupID, password}): Promise<void> => {
		return new Promise((resolve, reject) => {
			// Show a saving snackbar
			const saving = enqueueSnackbar('Saving')

			// Send the data th the server
			fetch(`${serverUrl}/user`, {
				method: 'POST',
				body: JSON.stringify({
					firstname,
					lastname,
					username,
					groupID,
					password
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
					errorState('user', error, enqueueSnackbar)
					reject()
				})
		})
	}

	return {
		users,
		isLoading: !data && !error,
		error,
		addUser
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

export default useUsers

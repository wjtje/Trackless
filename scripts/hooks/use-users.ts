import {useSnackbar} from 'notistack'
import {useContext, useEffect} from 'react'
import useSWR from 'swr'
import {ServerContext} from '../../pages/_app'
import TracklessUser from '../classes/trackless-user'
import AppError from '../error/app-error'
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
	 * This function will add a new user to the server
	 */
	addUser: ({
		firstname,
		lastname,
		username,
		groupID,
		password
	}) => Promise<boolean>;
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

	const addUser = async ({firstname, lastname, username, groupID, password}): Promise<boolean> => {
		// Show a saving snackbar
		const saving = enqueueSnackbar('Saving')

		try {
			// Create the new user
			await TracklessUser.createUser({
				firstname,
				lastname,
				username,
				password,
				groupID,
				serverUrl,
				apiKey
			})

			// Update the location List
			await mutate()

			// Show the user it's saved
			enqueueSnackbar(
				'Saved!',
				{
					variant: 'success'
				}
			)

			return true
		} catch (error: unknown) {
			throw error
		} finally {
			// Close the snackbar
			closeSnackbar(saving)
		}
	}

	return {
		users,
		isLoading: !data && !error,
		error,
		addUser
	}
}

export default useUsers

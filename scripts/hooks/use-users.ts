import {useSnackbar} from 'notistack'
import {useEffect} from 'react'
import useSWR from 'swr'
import TracklessUser from '../classes/trackless-user'
import HttpRequestError from '../error/http-request-error'

/**
 * Get all users on the server sorted by firstname and lastname
 */
function useUsers(): {
	users: TracklessUser[];
	isLoading: boolean;
	error: HttpRequestError;
} {
	// Get the data from the server
	const {data, error} = useSWR('/user?sort=firstname,lastname')

	// Check for any error
	const {enqueueSnackbar} = useSnackbar()
	useEffect(() => {
		if (error !== undefined) {
			switch (error.status) {
				case 403:
					enqueueSnackbar('You don\'t have access to do that')
					break
				default:
					enqueueSnackbar('Something went wrong')
			}
		}
	}, [error, enqueueSnackbar])

	// Parse the data
	const users: TracklessUser[] = []

	if (Array.isArray(data)) {
		data.forEach(element => {
			users.push(new TracklessUser(element))
		})
	}

	return {
		users,
		isLoading: !data && !error,
		error
	}
}

export default useUsers

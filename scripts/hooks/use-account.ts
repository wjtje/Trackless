import {useSnackbar} from 'notistack'
import {useEffect} from 'react'
import useSWR from 'swr'
import TracklessUser from '../classes/trackless-user'
import HttpRequestError from '../error/http-request-error'

/**
 * Get information about your account
 */
function useAccount(): {
	account: TracklessUser;
	isLoading: boolean;
	error: HttpRequestError;
} {
	// Get the data from the server
	const {data, error} = useSWR('/user/~')

	// Check for any error
	const {enqueueSnackbar} = useSnackbar()
	useEffect(() => {
		if (error !== undefined) {
			// This key makes sure that only one message is shown every minute
			const key = `${new Date(Date.now()).getMinutes()}-account`
			switch (error.status) {
				case 403:
					enqueueSnackbar('You don\'t have access to do that', {
						key: `${key}-403`,
						variant: 'warning'
					})
					break
				default:
					enqueueSnackbar('Something went wrong', {
						key: `${key}-other`,
						variant: 'error'
					})
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
		account: users[0],
		isLoading: !data && !error,
		error
	}
}

export default useAccount

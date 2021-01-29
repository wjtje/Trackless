import {useSnackbar} from 'notistack'
import {useEffect} from 'react'
import useSWR from 'swr'
import TracklessAccess from '../classes/trackless-access'
import HttpRequestError from '../error/http-request-error'

/**
 * Get the access rules of the current user
 */
function useAccess(): {
	access: TracklessAccess[];
	accessList: string[];
	isLoading: boolean;
	error: HttpRequestError;
} {
	// Get the data from the server
	const {data, error} = useSWR('/user/~/access')!

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
	const access: TracklessAccess[] = []
	const accessList: string[] = []

	if (Array.isArray(data)) {
		data.forEach(element => {
			access.push(new TracklessAccess(element))
			accessList.push(element.access)
		})
	}

	return {
		access,
		accessList,
		isLoading: !data && !error,
		error
	}
}

export default useAccess

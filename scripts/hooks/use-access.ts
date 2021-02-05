import {useSnackbar} from 'notistack'
import {useContext, useEffect} from 'react'
import useSWR from 'swr'
import {ServerContext} from '../../pages/_app'
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
	const {enqueueSnackbar} = useSnackbar()
	const {serverUrl, apiKey} = useContext(ServerContext)

	// Get the data from the server
	const {data, error} = useSWR('/user/~/access')!

	// Check for any error
	useEffect(() => {
		if (error !== undefined && (serverUrl !== '' && apiKey !== '')) {
			// This key makes sure that only one message is shown every minute
			const key = `${new Date(Date.now()).getMinutes()}-access`

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
	}, [error, enqueueSnackbar, serverUrl, apiKey])

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

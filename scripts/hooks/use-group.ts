import {useSnackbar} from 'notistack'
import {useEffect} from 'react'
import useSWR from 'swr'
import TracklessGroup from '../classes/trackless-group'
import HttpRequestError from '../error/http-request-error'

/**
 * Get all groups on the server sorted by groupName
 */
function useGroups(): {
	groups: TracklessGroup[];
	isLoading: boolean;
	error: HttpRequestError;
} {
	// Get the data from the server
	const {data, error} = useSWR('/group?sort=groupName')

	// Check for any error
	const {enqueueSnackbar} = useSnackbar()
	useEffect(() => {
		if (error !== undefined) {
			// This key makes sure that only one message is shown every minute
			const key = `${new Date(Date.now()).getMinutes()}-groups`
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
	const groups: TracklessGroup[] = []

	if (Array.isArray(data)) {
		data.forEach(element => {
			groups.push(new TracklessGroup(element))
		})
	}

	return {
		groups,
		isLoading: !data && !error,
		error
	}
}

export default useGroups

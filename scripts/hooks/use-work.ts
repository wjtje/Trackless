import {useSnackbar} from 'notistack'
import {useContext} from 'react'
import {ServerContext} from '../../pages/_app'
import TracklessWork from '../classes/trackless-work'
import AppError from '../error/app-error'

function useWork(): {
	/**
	 * This function will get all the work from a user
	 */
	getWork: (userID: number | string, startDate: string, endDate: string) => Promise<TracklessWork[]>;
} {
	// Connect to global hooks
	const {apiKey, serverUrl} = useContext(ServerContext)
	const {enqueueSnackbar, closeSnackbar} = useSnackbar()

	/**
	 * Get all work for a user
	 */
	const getWork = async (userID: number | string, startDate: string, endDate: string) => {
		// Get the data from the server
		const response = await fetch(
			`${serverUrl}/user/${String(userID)}/work?startDate=${startDate}&endDate=${endDate}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${apiKey}`
				}
			}
		)

		const responseBody = await response.json()

		// Check for any error's
		if (response.status !== 200) {
			throw new AppError(responseBody.code ?? 'Unknown')
		}

		// Parse the result
		const result: TracklessWork[] = []

		responseBody.forEach(element => {
			result.push(new TracklessWork(element))
		})

		return result
	}

	return {
		getWork
	}
}

export default useWork

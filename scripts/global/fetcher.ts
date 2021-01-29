import HttpRequestError from '../error/http-request-error'

/**
 * A fetcher that you can use with useSWR
 * @param apiKey Your apiKey
 */
export default function fetcher(apiKey: string, serverUrl: string) {
	const fetcher = async (url: string) => {
		// Get the data from the server
		const response = await fetch(
			`${serverUrl}${url}`,
			{
				headers: {
					Authorization: `Bearer ${apiKey}`
				}
			}
		)

		// If the status code is not in the 200-299 range
		// It is considered an error
		if (!response.ok) {
			// Create a HttpRequestError
			const error = new HttpRequestError(response.status, await response.json())
			throw error
		}

		return response.json()
	}

	return fetcher
}

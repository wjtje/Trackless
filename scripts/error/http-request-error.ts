/**
 * This error will be thrown if there is a problem while fetching data
 * from the server
 */
class HttpRequestError extends Error {
	constructor(public status: number, public info: Record<string, unknown>) {
		super()
	}
}

export default HttpRequestError

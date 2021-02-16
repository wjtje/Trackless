import {OptionsObject} from 'notistack'
import {ReactNode, ReactText} from 'react'
import HttpRequestError from './http-request-error'

/**
 * This function will display the correct message for the error
 */
function errorState(key: string, error: HttpRequestError, enqueueSnackbar: (message: ReactNode, options?: OptionsObject) => ReactText) {
	console.error(error)

	// Check for a few default codes
	switch (error?.info?.code) {
		case 'trackless.reference.delete':
			enqueueSnackbar('This item cann\'t be delete becuse it\'s in use', {
				key: `${key}-reference`,
				variant: 'warning'
			})
			break
		default:
			// Check for the status code
			switch (error.status) {
				case 403:
					enqueueSnackbar('You don\'t have access to do that', {
						key: `${key}-403`,
						variant: 'warning'
					})
					break
				case 400:
					enqueueSnackbar(`Internal error (${String(error?.info?.code ?? 'Unknown')})`, {
						key: `${key}-400`,
						variant: 'warning'
					})
					break
				default:
					enqueueSnackbar(`Something went wrong (${String(error?.info?.code ?? 'Unknown')})`, {
						key: `${key}-other`,
						variant: 'error'
					})
			}
	}
}

export default errorState


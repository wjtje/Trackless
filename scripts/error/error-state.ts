import {OptionsObject} from 'notistack'
import {ReactNode, ReactText} from 'react'

/**
 * This function will display the correct message for the error
 */
function errorState(key: string, error, enqueueSnackbar: (message: ReactNode, options?: OptionsObject) => ReactText) {
	switch (error.status) {
		case 403:
			enqueueSnackbar('You don\'t have access to do that', {
				key: `${key}-403`,
				variant: 'warning'
			})
			break
		case 400:
			enqueueSnackbar('Internal error', {
				key: `${key}-400`,
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

export default errorState


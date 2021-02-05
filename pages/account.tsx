import {Typography} from '@material-ui/core'
import React from 'react'
import useAccount from '../scripts/hooks/use-account'
import {Skeleton} from '@material-ui/lab'
import AccountDetails from '../components/account-details'
import AccountOptions from '../components/account-options'
import PageFade from '../components/page-fade'

export const accountPageAccess = [
	'trackless.user.readOwn'
]

/**
 * The account page
 */
const Account = () => {
	const {account, isLoading, error} = useAccount()

	return (
		<PageFade>
			<Typography variant="h5">
				{isLoading && !error ? <Skeleton/> : `Hello ${account.fullname}!`}
			</Typography>

			<AccountDetails account={account} isLoading={isLoading && !error}/>

			<AccountOptions/>
		</PageFade>
	)
}

export default Account

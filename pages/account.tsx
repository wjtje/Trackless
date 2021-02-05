import {Container, createStyles, makeStyles, Typography} from '@material-ui/core'
import React from 'react'
import useAccount from '../scripts/hooks/use-account'
import {Skeleton} from '@material-ui/lab'
import AccountDetails from '../components/account-details'
import AccountOptions from '../components/account-options'
import PageFade from '../components/page-fade'

export const accountPageAccess = [
	'trackless.user.readOwn'
]

// Custom styles used on this page
const useStyle = makeStyles(theme => createStyles({
	container: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2)
	}
}))

/**
 * The account page
 */
const Account = () => {
	const classes = useStyle()
	const {account, isLoading, error} = useAccount()

	return (
		<PageFade>
			<Container className={classes.container}>
				<Typography variant="h5">
					{isLoading && !error ? <Skeleton/> : `Hello ${account.fullname}!`}
				</Typography>

				<AccountDetails account={account} isLoading={isLoading && !error}/>

				<AccountOptions/>
			</Container>
		</PageFade>
	)
}

export default Account

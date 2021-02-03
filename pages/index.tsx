import React, {useEffect} from 'react'
import useAccess from '../scripts/hooks/use-access'
import Router from 'next/router'
import {exportPageAccess} from './export'
import {Button, createStyles, makeStyles, Typography} from '@material-ui/core'
import {ServerContext} from './_app'

// Custom styles used by this page
const useStyles = makeStyles(theme => createStyles({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh'
	},
	loadingText: {
		textAlign: 'center'
	},
	buttonHolder: {
		marginTop: theme.spacing(2),
		display: 'flex',
		justifyContent: 'center'
	}
}))

const LoadingPage = () => {
	const classes = useStyles()
	const {accessList} = useAccess()

	// Redirect the user to an other page
	useEffect(() => {
		if (accessList.length > 0 && exportPageAccess.every(value => accessList.includes(value))) {
			void Router.replace('/export')
		}
	}, [accessList])

	return (
		<div className={classes.container}>
			<div>
				<Typography variant="h5" className={classes.loadingText}>Trackless Beta is loading</Typography>
				<Typography variant="body2" className={classes.loadingText}>If the app get&apos;s stuck here then you could reset the app</Typography>
				<ServerContext.Consumer>
					{value => (
						<div className={classes.buttonHolder}>
							<Button
								onClick={() => {
									// Clear the localstorage and reload the page
									value.setApiKey(_ => '')
									value.setServerUrl(_ => '')
								}}
							>
								Reset app
							</Button>
						</div>
					)}
				</ServerContext.Consumer>
			</div>
		</div>
	)
}

export default LoadingPage

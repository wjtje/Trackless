import {Button, Container, createStyles, makeStyles, TextField, Typography} from '@material-ui/core'
import React, {useState} from 'react'
import {useSnackbar} from 'notistack'
import getApiKey from '../scripts/pages/login/get-api-key'
import {ServerContext} from './_app'
import Head from 'next/head'
import PageFade from '../components/page-fade'

const useStyles = makeStyles(theme =>
	createStyles({
		root: {
			paddingBottom: theme.spacing(2)
		},
		title: {
			paddingTop: theme.spacing(3),
			paddingBottom: theme.spacing(3)
		},
		input: {
			marginBottom: theme.spacing(2)
		}
	})
)

const LoginPage = () => {
	const {enqueueSnackbar} = useSnackbar()
	const classes = useStyles()

	// States for the inputs
	const [serverUrl, setServerUrl] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [deviceName, setDeviceName] = useState('')

	return (
		<PageFade>
			<Head>
				<title key="title">Trackless - Sing in</title>
			</Head>

			<Container
				maxWidth="sm"
				className={classes.root}
			>
				{/* The app title */}
				<Typography
					className={classes.title}
					variant="h3"
					align="center"
					color="secondary"
				>
					Trackless
				</Typography>
				{/* The inputs */}
				<TextField
					fullWidth
					required
					className={classes.input}
					variant="outlined"
					label="Server"
					value={serverUrl}
					onChange={event => {
						setServerUrl(event.target.value)
					}}
				/>

				<TextField
					fullWidth
					required
					className={classes.input}
					variant="outlined"
					label="Username"
					value={username}
					onChange={event => {
						setUsername(event.target.value)
					}}
				/>

				<TextField
					fullWidth
					required
					className={classes.input}
					variant="outlined"
					label="Password"
					type="password"
					value={password}
					onChange={event => {
						setPassword(event.target.value)
					}}
				/>

				<TextField
					fullWidth
					className={classes.input}
					variant="outlined"
					label="Device name"
					value={deviceName}
					onChange={event => {
						setDeviceName(event.target.value)
					}}
				/>
				{/* The sign in button and disclaimer */}
				<ServerContext.Consumer>
					{value => (
						<Button
							fullWidth
							className={classes.input}
							variant="contained"
							color="primary"
							onClick={() => {
							// Try singing in
								getApiKey(
									{
										serverUrl,
										username,
										password,
										deviceName
									},
									enqueueSnackbar,
									value.setServerUrl,
									value.setApiKey
								)
							}}
						>
							Sign in
						</Button>
					)}
				</ServerContext.Consumer>

				<Typography
					variant="body2"
				>
					Trackless does not store any personal information about you or your device.
					All entered infomation in this app is stored on your companies server.
					This software is under MIT license. For more information go to <a href="#">trackless.ga</a>
				</Typography>
			</Container>
		</PageFade>
	)
}

export default LoginPage

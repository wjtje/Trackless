import {ThemeProvider} from '@material-ui/core'
import Head from 'next/head'
import Router from 'next/router'
import {SnackbarProvider} from 'notistack'
import React, {createContext, Dispatch, useEffect} from 'react'
import {SWRConfig} from 'swr'
import createPersistedState from 'use-persisted-state'
import fetcher from '../scripts/global/fetcher'
import '../styles/globals.css'
import theme from '../theme/theme'

const useServerUrl = createPersistedState('serverUrl')
const useApiKey = createPersistedState('apiKey')

/**
 * The serverContext will store the serverUrl and the apiKey
 */
export const ServerContext = createContext({} as {
	serverUrl: string;
	apiKey: string;

	setServerUrl: Dispatch<(previousState: string) => string>;
	setApiKey: Dispatch<(previousState: string) => string>;
})

const MyApp = ({Component, pageProps}: {
	Component: () => JSX.Element;
	pageProps: any;
}) => {
	const [serverUrl, setServerUrl] = useServerUrl('')
	const [apiKey, setApiKey] = useApiKey('')

	// Move the user to the login page
	useEffect(() => {
		if (Router.pathname !== '/login' && (serverUrl === '' || apiKey === '')) {
			void Router.push('/login')
		}
	})

	return (
		<>
			<Head>
				<title key="title">Trackless</title>
				<link key="favicon" rel="icon" href="/favicon.ico"/>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
			</Head>

			<ServerContext.Provider
				value={{
					serverUrl,
					setServerUrl,
					apiKey,
					setApiKey
				}}
			>
				<ThemeProvider theme={theme}>
					<SnackbarProvider maxSnack={3}>
						<SWRConfig
							value={{
								fetcher: fetcher(apiKey, serverUrl),
								// TODO: should use a onErrorRetry to make sure the app recovers from a broken state (https://swr.vercel.app/docs/error-handling)
								shouldRetryOnError: false
							}}
						>
							<Component {...pageProps}/>
						</SWRConfig>
					</SnackbarProvider>
				</ThemeProvider>
			</ServerContext.Provider>
		</>
	)
}

export default MyApp

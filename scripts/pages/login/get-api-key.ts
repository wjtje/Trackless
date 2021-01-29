import Router from 'next/router'
import {OptionsObject} from 'notistack'
import React from 'react'
import createCorrectServerUrl from './create-server-url'

interface accountInfomation {
	serverUrl: string;
	username: string;
	password: string;
	deviceName: string;
}

export default function getApiKey({
	serverUrl,
	username,
	password,
	deviceName
}: accountInfomation,
enqueueSnackbar: (message: React.ReactNode, options?: OptionsObject) => React.ReactText,
setServerUrl: React.Dispatch<(previousState: string) => string>,
setApiKey: React.Dispatch<(previousState: string) => string>) {
	// Check the user's input
	if (serverUrl === '' || username === '' || password === '') {
		enqueueSnackbar('Not all required inputs are filled in')
	} else {
		void createCorrectServerUrl(serverUrl).catch(() => {
			enqueueSnackbar('The server url is not correct')
		}).then(serverUrl => {
			// Create a device name
			deviceName = (deviceName === '') ? `${username}'s device` : deviceName

			// Make sure the serverUrl is a string
			const server = String(serverUrl)

			// Get the apiKey
			fetch(`${server}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username,
					password,
					deviceName
				})
			}).then(async response => {
				if (response.status === 200) {
					return response.json()
				}

				if (response.status === 400) {
					enqueueSnackbar('Incorrect username or password')
				} else {
					enqueueSnackbar('Something went wrong')
				}
			}).then(data => {
				// Save the details
				setServerUrl(_ => server)
				setApiKey(_ => data.bearer)
				// Go to the home page
				void Router.push('/')
			}).catch(() => {
				console.log('Something went wrong while trying to get an apiKey')
			})
		})
	}
}

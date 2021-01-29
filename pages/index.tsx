import React, {useEffect} from 'react'
import useAccess from '../scripts/hooks/use-access'
import Router from 'next/router'
import {exportPageAccess} from './export'

const LoadingPage = () => {
	const {accessList} = useAccess()

	// Redirect the user to an other page
	useEffect(() => {
		if (accessList.length > 0) {
			// Check with page we can load
			if (exportPageAccess.every(value => accessList.includes(value))) {
				void Router.replace('/export')
			} else {
				void Router.replace('/thisWeek')
			}
		}
	}, [accessList])

	// TODO: show a loading animation
	return <h2>Trackless Beta is loading</h2>
}

export default LoadingPage

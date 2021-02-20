import {createStyles, makeStyles} from '@material-ui/core'
import React from 'react'

interface props {
	/**
	 * This title contains a short sentense that provides the user
	 * with easy to understand information about the current
	 * situation
	 */
	hintTitle: string;

	/**
	 * This text allows you to provides detailed information about what
	 * the user needs todo
	 */
	hintSubtext: string;

	/**
	 * This make the detail pane the main pane on mobile
	 */
	detailActive: boolean;

	children: JSX.Element | JSX.Element[];
}

export const DetailPageContext = React.createContext({
	hintTitle: 'Nothing is selected',
	hintSubtext: 'You can select a item from the left list',
	detailActive: false
})

/**
 * Custom styles used by this component
 */
const useStyles = makeStyles(_ =>
	createStyles({
		root: {
			width: '100%',
			height: '100%',
			overflow: 'hidden'
		}
	})
)

/**
 * A detail page contains a list and a detail pane where the
 * user can edit the selected item
 */
const DetailPage = ({children, hintTitle, hintSubtext, detailActive}: props) => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<DetailPageContext.Provider
				value={{
					hintTitle,
					hintSubtext,
					detailActive
				}}
			>
				{children}
			</DetailPageContext.Provider>
		</div>
	)
}

export default DetailPage

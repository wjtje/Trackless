import {createStyles, makeStyles, useMediaQuery, useTheme} from '@material-ui/core'
import React, {useContext} from 'react'
import {DetailPageContext} from '..'
import clsns from 'classnames'
import PageFade from '../../page-fade'
import {AnimatePresence, motion} from 'framer-motion'

interface props {
	children: JSX.Element;
}

/**
 * Custom styles used by this component
 */
const useStyles = makeStyles(theme =>
	createStyles({
		root: {
			width: '50%',
			height: '100%',
			float: 'left',
			padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
			overflowY: 'scroll',
			[theme.breakpoints.down('sm')]: {
				width: '100%'
			}
		},
		hidden: {
			[theme.breakpoints.down('sm')]: {
				display: 'none'
			}
		}
	})
)

/**
 * The list pane will store options that the user can select
 */
const ListPane = ({children}: props) => {
	const classes = useStyles()
	const theme = useTheme()
	const detailPage = useContext(DetailPageContext)
	const onMobile = useMediaQuery(theme.breakpoints.down('sm'))

	return (
		<AnimatePresence exitBeforeEnter>
			{
				// Hide the List is you are on a small screen and the detailPane is active
				onMobile && detailPage.detailActive ?
					<motion.div key="listPaneHidden" exit={{opacity: 0}}/> : // This is for the AnimatePresence
					<div key="listPane" className={clsns(classes.root, {[classes.hidden]: detailPage.detailActive})}>
						<PageFade>
							{children}
						</PageFade>
					</div>
			}
		</AnimatePresence>
	)
}

export default ListPane

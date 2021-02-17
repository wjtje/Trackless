import {createStyles, makeStyles, useMediaQuery, useTheme} from '@material-ui/core'
import React, {useContext} from 'react'
import {DetailPageContext} from '..'
import DetailPaneHint from '../detail-pane-hint'
import clsns from 'classnames'
import {AnimatePresence} from 'framer-motion'

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
			float: 'right',
			overflowY: 'auto',
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
 * The DetailPane will show details of the selected object
 */
const DetailPane = ({children}: props) => {
	const classes = useStyles()
	const theme = useTheme()
	const detailPage = useContext(DetailPageContext)
	const onMobile = useMediaQuery(theme.breakpoints.down('sm'))

	return (
		<div key="detailPane" className={clsns(classes.root, {[classes.hidden]: !detailPage.detailActive})}>
			{/*
				If we are on mobile and the detailPane is active, show it
				else hide is

				If we are on pc and the detailPane is active, show it
				else show the hint
			*/}
			<AnimatePresence exitBeforeEnter>
				{
					onMobile && detailPage.detailActive ?
						children :
						(detailPage.detailActive ?
							children :
							<DetailPaneHint
								key="detailPaneHint"
								title={detailPage.hintTitle}
								subtext={detailPage.hintSubtext}
							/>)
				}
			</AnimatePresence>
		</div>
	)
}

export default DetailPane

import {createStyles, makeStyles, Typography} from '@material-ui/core'
import React from 'react'
import PageFade from '../../page-fade'

interface props {
	/**
	 * The title (h5)
	 *
	 * It's important that this text is short and easy to understand
	 */
	title: string;
	/**
	 * The subtext (body2)
	 *
	 * This text is shown under the title and gives the user a hint
	 */
	subtext: string;
}

/**
 * Custom styles used on this page
 */
const useStyles = makeStyles(theme =>
	createStyles({
		root: {
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		},
		container: {
			padding: theme.spacing(2)
		},
		text: {
			textAlign: 'center'
		}
	})
)

/**
 * Show the user a hint
 */
const DetailPaneHint = ({title, subtext}: props) => {
	const classes = useStyles()

	return (
		<PageFade>
			<div className={classes.root}>
				<div className={classes.container}>
					<Typography
						variant="h5"
						className={classes.text}
					>
						{title}
					</Typography>
					<Typography
						variant="body2"
						className={classes.text}
					>
						{subtext}
					</Typography>
				</div>
			</div>
		</PageFade>
	)
}

export default DetailPaneHint

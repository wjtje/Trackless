import {AppBar, createStyles, List, ListItemText, makeStyles, Toolbar, Typography} from '@material-ui/core'
import {DateTime} from 'luxon'
import React from 'react'
import TracklessWork from '../../scripts/classes/trackless-work'
import WorkListItem from './work-list-item'

// Custom styles used on this page
const useStyles = makeStyles(theme =>
	createStyles({
		gutters: {
			padding: '0 16px !important'
		}
	})
)

interface props {
	workList: TracklessWork[];
}

const WorkListDay = ({workList}: props) => {
	const classes = useStyles()

	const headerDate = DateTime.fromISO(workList[0]?.date)

	// Calculate total amount of hours
	let hours = 0

	for (const work of workList) {
		hours += work.time
	}

	return (
		<>
			{/* Display the date and day of the array */}
			<AppBar position="sticky" color="secondary" elevation={0}>
				<Toolbar className={classes.gutters}>
					<ListItemText
						primary={headerDate.toLocaleString({weekday: 'long'})}
						secondary={headerDate.toLocaleString(DateTime.DATE_MED)}
					/>
					{hours} hour(s)
				</Toolbar>
			</AppBar>
			{/* Display the work list */}
			<List>
				{workList.map(work => <WorkListItem key={work.workID} work={work}/>)}
			</List>
		</>
	)
}

export default WorkListDay

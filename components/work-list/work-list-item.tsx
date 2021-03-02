import {ListItem, ListItemText} from '@material-ui/core'
import React from 'react'
import TracklessWork from '../../scripts/classes/trackless-work'

interface props {
	work: TracklessWork;
}

const WorkListItem = ({work}: props) => {
	return (
		<ListItem>
			<ListItemText
				primary={work.location.fullName}
				secondary={work.description}
			/>
		</ListItem>
	)
}

export default WorkListItem

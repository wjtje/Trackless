import {List} from '@material-ui/core'
import React from 'react'
import TracklessWork from '../../scripts/classes/trackless-work'
import WorkListItem from './work-list-item'

interface props {
	workList: TracklessWork[];
}

const WorkList = ({workList}: props) => {
	return (
		<List>
			{workList.map(work => <WorkListItem key={work.workID} work={work}/>)}
		</List>
	)
}

export default WorkList

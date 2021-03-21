import {List} from '@material-ui/core'
import {randomInt} from 'crypto'
import React, {useEffect, useState} from 'react'
import TracklessWork from '../../scripts/classes/trackless-work'
import WorkListDay from './work-list-day'

interface props {
	workList: TracklessWork[];
}

/**
 * This component will list a workList of type TracklessWork[]
 */
const WorkList = ({workList}: props) => {
	// Buffer for the work sorted by day
	const [sortedWork, setSortedWork] = useState<TracklessWork[][]>([])

	useEffect(() => {
		console.log(workList)

		if (workList !== undefined) {
			let temporary: TracklessWork[] = []
			const temporary2: TracklessWork[][] = []
			let previousDate = workList[0]?.date ?? ''

			// Loop over each work
			// And sort it by day
			for (const work of workList) {
				if (previousDate === work.date) {
					temporary.push(work)
				} else {
					temporary2.push(temporary)
					temporary = [work]
					previousDate = work.date
				}
			}

			// Save the last day
			temporary2.push(temporary)

			// Save temporary2
			setSortedWork(temporary2)
		}
	}, [workList])

	return (
		<>
			{sortedWork.map(work => <WorkListDay key={work[0]?.date ?? `empty ${randomInt(100)}`} workList={work}/>)}
		</>
	)
}

export default WorkList

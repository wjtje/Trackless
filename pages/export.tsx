import {Button, createStyles, Fab, List, ListItem, ListItemText, makeStyles, Theme, Typography, Zoom} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import useUsers from '../scripts/hooks/use-users'
import TracklessUser from '../scripts/classes/trackless-user'
import GetAppIcon from '@material-ui/icons/GetApp'
import PageFade from '../components/page-fade'
import {useIsPresent} from 'framer-motion'
import DetailPage from '../components/detail-page'
import ListPane from '../components/detail-page/list-pane'
import DetailPane from '../components/detail-page/detail-pane'
import SearchableList from '../components/searchable-list'
import useWork from '../scripts/hooks/use-work'
import TracklessWork from '../scripts/classes/trackless-work'
import {add, endOfDay, endOfWeek, format, startOfWeek} from 'date-fns'

export const exportPageAccess = [
	'trackless.user.readAll',
	'trackless.work.readAll'
]

// Custom styles used on this page
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		fab: {
			position: 'absolute',
			bottom: theme.spacing(2),
			right: theme.spacing(2),
			margin: theme.spacing(1)
		},
		extendedIcon: {
			marginRight: theme.spacing(1)
		}
	})
)

/**
 * A page to export user's work to a pdf
 */
const Export = () => {
	const {users} = useUsers()
	const {getWork} = useWork()
	const classes = useStyles()
	const isPresent = useIsPresent() // This is used for the zoom animation

	const [selectedUser, setSelectedUser] = useState<TracklessUser>(null)
	const [userWork, setUserWork] = useState<Record<string, TracklessWork[]>>({})
	const [userWorkTime, setUserWorkTime] = useState<Record<string, number>>({})

	// Update the work list when the user's changes
	useEffect(() => {
		const previousWeek = add(Date.now(), {weeks: -1})
		const startDate = format(startOfWeek(previousWeek), 'yyyy-LL-dd')
		const endDate = format(endOfWeek(previousWeek), 'yyyy-LL-dd')

		users.forEach(async user => {
			console.log(`Getting work for user: ${String(user.userID)}`)

			// Get the work
			const work = await getWork(
				user.userID,
				startDate,
				endDate
			)

			// Save the work
			setUserWork(userWork => ({
				...userWork,
				[user.userID]: work
			}))

			// Save time time
			// eslint-disable-next-line unicorn/no-array-reduce
			const time = work.map(w => w.time).reduce((a, b) => a + Number(b), 0)

			setUserWorkTime(userWorkTime => ({
				...userWorkTime,
				[user.userID]: time
			}))
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [users.length])

	return (
		<>
			<PageFade>
				<DetailPage
					hintTitle="No user selected"
					hintSubtext="Select a user from the list on the left or download all users at once"
					detailActive={selectedUser !== null}
				>
					<ListPane>
						{/* List of user on the system */}
						<SearchableList<TracklessUser>
							list={users}
							listProperties={{
								key: 'userID',
								primaryText: 'fullname',
								secondaryText: user => `${userWorkTime[user.userID] ?? 0} hour(s) recorded last week`
							}}
							onClick={setSelectedUser}
						/>
					</ListPane>
					<DetailPane>
						{/* Show information about the selected user */}
						<PageFade>
							<Typography>{selectedUser?.fullname} - {selectedUser?.userID}</Typography>
							<Button
								onClick={() => {
									setSelectedUser(null)
								}}
							>
								Close
							</Button>
						</PageFade>
					</DetailPane>
				</DetailPage>
			</PageFade>

			<Zoom in={isPresent}>
				<Fab
					className={classes.fab}
					variant="extended"
					color="secondary"
				>
					<GetAppIcon className={classes.extendedIcon}/>
					Download
				</Fab>
			</Zoom>
		</>
	)
}

export default Export

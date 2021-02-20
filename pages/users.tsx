import {List, ListItem, ListItemText} from '@material-ui/core'
import React from 'react'
import DetailPage from '../components/detail-page'
import DetailPane from '../components/detail-page/detail-pane'
import ListPane from '../components/detail-page/list-pane'
import PageFade from '../components/page-fade'
import useUsers from '../scripts/hooks/use-users'

export const userPageAccess = [
	'trackless.user.readAll',
	'trackless.user.create',
	'trackless.user.editAll',
	'trackless.user.remove'
]

const User = () => {
	const {users} = useUsers()

	return (
		<PageFade>
			<DetailPage
				hintTitle="No user selected"
				hintSubtext="Select a user from the list or add a new one"
				detailActive={false}
			>
				<ListPane>
					<List>
						{users?.map(user => (
							<ListItem key={user.userID}>
								<ListItemText primary={user.fullname} secondary={user.username}/>
							</ListItem>
						))}
					</List>
				</ListPane>
				<DetailPane>
					<p>Nothing is selected</p>
				</DetailPane>
			</DetailPage>
		</PageFade>
	)
}

export default User

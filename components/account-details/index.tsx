import {createStyles, makeStyles, Theme, Typography} from '@material-ui/core'
import {Skeleton} from '@material-ui/lab'
import React from 'react'
import TracklessUser from '../../scripts/classes/trackless-user'

interface props {
	account: TracklessUser | null;
	isLoading: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		table: {
			width: 'auto',
			[theme.breakpoints.up('sm')]: {
				width: '300px'
			}
		},
		tableHeader: {
			textAlign: 'left',
			paddingRight: '8px'
		}
	})
)

/**
 * Display a table with account details
 */
const AccountDetails = ({account, isLoading}: props) => {
	const classes = useStyles()

	return (
		<>
			<Typography variant="h6">
				Your details
			</Typography>
			<table className={classes.table}>
				<tr>
					<th className={classes.tableHeader}>
						<Typography>
							Firstname
						</Typography>
					</th>
					<td>
						<Typography>
							{isLoading ? <Skeleton width={150}/> : account?.firstname}
						</Typography>
					</td>
				</tr>

				<tr>
					<th className={classes.tableHeader}>
						<Typography>
							Lastname
						</Typography>
					</th>
					<td>
						<Typography>
							{isLoading ? <Skeleton width={150}/> : account?.lastname}
						</Typography>
					</td>
				</tr>

				<tr>
					<th className={classes.tableHeader}>
						<Typography>
							Username
						</Typography>
					</th>
					<td>
						<Typography>
							{isLoading ? <Skeleton width={150}/> : account?.username}
						</Typography>
					</td>
				</tr>

				<tr>
					<th className={classes.tableHeader}>
						<Typography>
							Group
						</Typography>
					</th>
					<td>
						<Typography>
							{isLoading ? <Skeleton width={150}/> : account?.groupName}
						</Typography>
					</td>
				</tr>
			</table>
		</>
	)
}

export default AccountDetails

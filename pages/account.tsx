import {AppBar, Container, CssBaseline, IconButton, Toolbar, Typography} from '@material-ui/core'
import React, {useState} from 'react'
import AppDrawer, {useDrawerStyles} from '../components/app-drawer'
import appbarStyles from '../styles/Appbar.module.css'
import MenuIcon from '@material-ui/icons/Menu'
import clsns from 'classnames'
import useAccount from '../scripts/hooks/use-account'
import {Skeleton} from '@material-ui/lab'
import AccountDetails from '../components/account-details'
import AccountOptions from '../components/account-options'

export const accountPageAccess = [
	'trackless.user.readOwn'
]

const Account = () => {
	const drawerClasses = useDrawerStyles()
	const {account, isLoading, error} = useAccount()

	const [drawer, setDrawer] = useState(false)

	return (
		<div className={drawerClasses.root}>
			<CssBaseline/>
			<AppBar position="fixed" className={drawerClasses.appBar}>
				<Toolbar>
					<IconButton
						edge="start"
						className={clsns(appbarStyles.menuButton, drawerClasses.menuButton)}
						color="inherit"
						aria-label="menu"
						onClick={() => {
							setDrawer(true)
						}}
					>
						<MenuIcon/>
					</IconButton>

					<Typography
						variant="h6"
					>
						Trackless
					</Typography>
				</Toolbar>
			</AppBar>

			<AppDrawer
				drawerOpen={drawer}
				onDrawerClose={() => {
					setDrawer(false)
				}}
			/>

			<Container className={drawerClasses.content}>
				<div className={drawerClasses.toolbar}/>
				<div className={drawerClasses.mainContent}>
					<Typography variant="h5">
						{isLoading && !error ? <Skeleton/> : `Hello ${account.fullname}!`}
					</Typography>

					<AccountDetails account={account} isLoading={isLoading && !error}/>

					<AccountOptions/>
				</div>
			</Container>
		</div>
	)
}

export default Account

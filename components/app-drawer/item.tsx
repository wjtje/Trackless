import {createStyles, ListItem, ListItemIcon, ListItemText, makeStyles, SvgIconTypeMap} from '@material-ui/core'
import {useRouter} from 'next/router'
import Link from 'next/link'
import React from 'react'
import clsns from 'classnames'
import {OverridableComponent} from '@material-ui/core/OverridableComponent'

// Custom styles of this component
const useStyles = makeStyles(theme =>
	createStyles({
		// Styles for the list items
		listItem: {
			height: 40,
			margin: '4px 8px',
			padding: '0px 8px',
			width: 'auto',
			borderRadius: '4px',
			transitionTimingFunction: 'ease',
			transition: 'background 0.5s'
		},
		listItemActive: {
			background: 'rgba(4,75,127,.12)',
			color: '#044b7f',
			'&:hover': {
				background: 'rgba(4,75,127,.24)'
			}
		},
		listItemIconActive: {
			fill: '#044b7f'
		}
	})
)

interface props {
	/**
	 * A List of access rules for the current user
	 */
	accessList: string[];

	/**
	 * A list of required access rules for the page
	 */
	pageList: string[];

	/**
	 * The url to this page
	 */
	url: string;

	/**
	 * The name of this page
	 */
	name: string;

	/**
	 * The icon for this page
	 */
	Icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>>>;

	/**
	 * A event that is fired when the user clicks on this item
	 */
	onClick: () => void;
}

/**
 * A list item inside the drawer
 */
const AppDrawerItem = ({accessList, pageList, url, name, Icon, onClick}: props) => {
	const classes = useStyles()
	const router = useRouter()

	// Check if we need to show this item
	return pageList.every(value => accessList.includes(value)) ? (
		<Link href={url}>
			<ListItem
				button
				// Check if this one is active
				className={clsns(classes.listItem, {
					[classes.listItemActive]: router.pathname === url
				})}
				onClick={onClick}
			>
				<ListItemIcon>
					<Icon
						// Check if the icon is active
						className={clsns({
							[classes.listItemIconActive]: router.pathname === url
						})}
					/>
				</ListItemIcon>
				<ListItemText primary={name}/>
			</ListItem>
		</Link>
	) : null
}

export default AppDrawerItem

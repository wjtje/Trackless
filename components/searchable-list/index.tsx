import {createStyles, List, ListItem, ListItemText, makeStyles, TextField} from '@material-ui/core'
import React, {useCallback, useEffect, useState} from 'react'

// Custom styles used by this component
const useStyle = makeStyles(theme =>
	createStyles({
		searchBar: {
			marginTop: theme.spacing(1)
		}
	})
)

interface props<T> {
	/**
	 * An array of objects
	 */
	list: T[];

	/**
	 * Define properties of yout objects
	 */
	listProperties: {
		/**
		 * A unique key of each object
		 */
		key: keyof T;
		/**
		 * The primary text of this object
		 */
		primaryText: keyof T | ((object: T) => string);
		/**
		 * The secondary text of this object
		 */
		secondaryText: keyof T | ((object: T) => string);
	};

	/**
	 * Runs when the user selects a listTile
	 */
	onClick: (object: T) => void;

	className?: (object: T) => string;
}

/**
 * A searchableList creates a searchbar with a list beneath it
 */
// eslint-disable-next-line @typescript-eslint/comma-dangle
const SearchableList = <T,>({list, listProperties, onClick, className}: props<T>) => {
	const [searchBarText, setSearchBarText] = useState('')
	const [displayList, setDisplayList] = useState<T[]>([])
	const classes = useStyle()

	/**
	 * Get the primary text of an item
	 */
	const getPrimaryText = useCallback(
		(item: T) => {
			// Get the primaryText
			if (typeof listProperties.primaryText === 'function') {
				return listProperties.primaryText(item)
			}

			return String(item[listProperties.primaryText])
		},
		[listProperties]
	)

	/**
	 * Get the secondary text of an item
	 */
	const getsecondaryText = useCallback(
		(item: T) => {
			// Get the primaryText
			if (typeof listProperties.secondaryText === 'function') {
				return listProperties.secondaryText(item)
			}

			return String(item[listProperties.secondaryText])
		},
		[listProperties]
	)

	useEffect(() => {
		const searchText = searchBarText.toLowerCase()

		setDisplayList(
			list.filter(item => {
				return (
					getPrimaryText(item).toLowerCase().includes(searchText) ||
					getsecondaryText(item).toLowerCase().includes(searchText)
				)
			})
		)
	}, [searchBarText, list, getPrimaryText, getsecondaryText])

	return (
		<>
			<TextField
				fullWidth
				className={classes.searchBar}
				placeholder="Search here"
				value={searchBarText}
				onChange={event => {
					setSearchBarText(event.target.value)
				}}
			/>

			<List>
				{displayList?.map(item => (
					<ListItem
						key={String(item[listProperties.key])}
						button
						onClick={() => {
							onClick(item)
						}}
					>
						<ListItemText
							className={(() => {
								// Get the classname
								if (typeof className === 'function') {
									return className(item)
								}

								return ''
							})()}
							primary={getPrimaryText(item)}
							secondary={getsecondaryText(item)}
						/>
					</ListItem>
				))}
			</List>
		</>
	)
}

export default SearchableList


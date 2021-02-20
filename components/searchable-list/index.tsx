import {List, ListItem, ListItemText} from '@material-ui/core'
import React from 'react'

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
	return (
		<List>
			{list?.map(item => (
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
						primary={(() => {
							// Get the primaryText
							if (typeof listProperties.primaryText === 'function') {
								return listProperties.primaryText(item)
							}

							return item[listProperties.primaryText]
						})()}
						secondary={(() => {
							// Get the secondaryText
							if (typeof listProperties.secondaryText === 'function') {
								return listProperties.secondaryText(item)
							}

							return item[listProperties.secondaryText]
						})()}
					/>
				</ListItem>
			))}
		</List>
	)
}

export default SearchableList

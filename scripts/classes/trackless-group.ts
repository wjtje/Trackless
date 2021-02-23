/**
 * A TracklessGroup class will contain all the data of a group and
 * provide some function to quickly get access to certain data
 */
class TracklessGroup {
	/**
	 * The uniqe number for the group
	 */
	groupID: number

	/**
	 * The name of the group
	 */
	groupName: string

	constructor(group) {
		// Define the properties and there types
		const properties = [
			{name: 'groupID', type: 'number'},
			{name: 'groupName', type: 'string'}
		]

		// Test all the properties
		properties.forEach(property => {
			console.assert(typeof group[property.name] === property.type, {property, group})

			// Assign the property
			this[property.name] = group[property.name]
		})
	}
}

export default TracklessGroup

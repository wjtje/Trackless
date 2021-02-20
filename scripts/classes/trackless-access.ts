/**
 * A class that contains all the logic that is use by the access rules
 */
class TracklessAccess {
	/**
	 * A uniqe number for each location
	 */
	accessID: number

	/**
	 * The 'real' access rule
	 */
	access: string

	constructor(access) {
		// Define the properties and there types
		const properties = [
			{name: 'accessID', type: 'number'},
			{name: 'access', type: 'string'}
		]

		// Test all the properties
		properties.forEach(property => {
			console.assert(typeof access[property.name] === property.type, {property, access})

			// Assign the property
			this[property.name] = access[property.name]
		})
	}
}

export default TracklessAccess

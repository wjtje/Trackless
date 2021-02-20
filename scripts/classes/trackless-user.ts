/**
 * A TracklessUser class will contain all the data of a user and
 * provide some function to quickly get access to certain data
 */
class TracklessUser {
	/**
	 * A uniqe number for each user
	 */
	userID: number

	/**
	 * The firstname of the user
	 */
	firstname: string

	/**
	 * The lastname of the user
	 */
	lastname: string

	/**
	 * The username of the user
	 */
	username: string

	/**
	 * The uniqe number for the group of the user
	 */
	groupID: number

	/**
	 * The name of the group where this user is part of
	 */
	groupName: string

	constructor(user) {
		// Define the properties and there types
		const properties = [
			{name: 'userID', type: 'number'},
			{name: 'firstname', type: 'string'},
			{name: 'lastname', type: 'string'},
			{name: 'username', type: 'string'},
			{name: 'groupID', type: 'number'},
			{name: 'groupName', type: 'string'}
		]

		// Test all the properties
		properties.forEach(property => {
			console.assert(typeof user[property.name] === property.type, {property, user})

			// Assign the property
			this[property.name] = user[property.name]
		})
	}

	/**
	 * Get the user's full name
	 */
	get fullname() {
		return `${this.firstname} ${this.lastname}`
	}
}

export default TracklessUser

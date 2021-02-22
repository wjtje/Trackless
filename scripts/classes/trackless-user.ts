import AppError from '../error/app-error'

/**
 * A TracklessUser class will contain all the data of a user and
 * provide some function to quickly get access to certain data
 */
class TracklessUser {
	/**
	 * A uniqe number for each user
	 */
	readonly userID: number
	/**
	 * The firstname of the user
	 */
	public firstname: string
	/**
	 * The lastname of the user
	 */
	public lastname: string
	/**
	 * The username of the user
	 */
	public username: string
	/**
	 * The uniqe number for the group of the user
	 */
	public groupID: number
	/**
	 * The name of the group where this user is part of
	 */
	readonly groupName: string

	constructor(user: Record<string, unknown>) {
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
			// Test the properties type
			if (typeof user[property.name] === property.type) {
				this[property.name] = user[property.name]
			} else {
				throw new AppError('local.tracklessUser.formatError')
			}
		})
	}

	/**
	 * Will create a new TracklessUser object and save it to the server
	 */
	static async createUser({
		firstname,
		lastname,
		username,
		password,
		groupID,
		serverUrl,
		apiKey
	}): Promise<TracklessUser> {
		// Send the details to the server
		const responsePostUser = await fetch(
			`${String(serverUrl)}/user`,
			{
				method: 'POST',
				body: JSON.stringify({
					firstname,
					lastname,
					username,
					password,
					groupID
				}),
				headers: {
					Authorization: `Bearer ${String(apiKey)}`,
					'Content-Type': 'application/json'
				}
			}
		)

		const responsePostUserBody = await responsePostUser.json()

		// Check for any error
		if (responsePostUser.status !== 201) {
			throw new AppError(responsePostUserBody.code ?? 'Unknown')
		}

		const userID = responsePostUserBody.userID ?? 0

		// Get the groupName from the server
		const responseGroupName = await fetch(
			`${String(serverUrl)}/group/${String(groupID)}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${String(apiKey)}`
				}
			}
		)

		const responseGroupNameBody = await responseGroupName.json()

		const groupName = responseGroupNameBody[0]?.groupName ?? 'Unknown'

		// Create a new TracklessUser object
		return new TracklessUser({
			userID,
			firstname,
			lastname,
			username,
			groupID,
			groupName
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

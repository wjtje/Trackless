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
	 * This function will update an exsisting Trackless user with new values
	 */
	async updateUser({firstname, lastname, username, password, groupID, serverUrl, apiKey}: {
		firstname?: string;
		lastname?: string;
		username?: string;
		password?: string;
		groupID?: string | number;
		serverUrl: string;
		apiKey: string;
	}) {
		// Send the details to the server
		const responsePatch = await fetch(
			`${serverUrl}/user/${this.userID}`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					// This makes sure only valid values makes it into the object
					// Values that are null, undefined or empty are removed
					...(firstname !== null && firstname !== undefined && firstname !== '') ? {firstname} : null,
					...(lastname !== null && lastname !== undefined && lastname !== '') ? {lastname} : null,
					...(username !== null && username !== undefined && username !== '') ? {username} : null,
					...(password !== null && password !== undefined && password !== '') ? {password} : null
				}),
				headers: {
					Authorization: `Bearer ${String(apiKey)}`,
					'Content-Type': 'application/json'
				}
			}
		)

		// Check for any error
		if (responsePatch.status !== 200) {
			throw new AppError((await responsePatch.json()).code ?? 'Unknown')
		}

		// Check if we need to change the groupID
		if (groupID !== null && groupID !== undefined && groupID !== '') {
			const responseGroupID = await fetch(
				`${serverUrl}/group/${groupID}/user`,
				{
					method: 'POST',
					body: JSON.stringify({
						userID: this.userID
					}),
					headers: {
						Authorization: `Bearer ${String(apiKey)}`,
						'Content-Type': 'application/json'
					}
				}
			)

			// Check for any error
			if (responseGroupID.status !== 201) {
				throw new AppError((await responseGroupID.json()).code ?? 'Unknown')
			}
		}
	}

	/**
	 * This function will remove a user from the server
	 */
	async deleteUser({serverUrl, apiKey}: {serverUrl: string; apiKey: string}) {
		// Send the details to the server
		const response = await fetch(
			`${serverUrl}/user/${this.userID}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${apiKey}`,
					'Content-Type': 'application/json'
				}
			}
		)

		// Check for any error
		if (response.status !== 200) {
			throw new AppError((await response.json()).code ?? 'Unknown')
		}
	}

	/**
	 * Get the user's full name
	 */
	get fullname() {
		return `${this.firstname} ${this.lastname}`
	}
}

export default TracklessUser

/**
 * A TracklessUser class will contain all the data of a user and
 * provide some function to quickly get access to certain data
 */
class TracklessUser {
	userID: number
	firstname: string
	lastname: string
	username: string
	groupID: number
	groupName: string

	constructor(user) {
		// Create the user object
		this.userID = user.userID
		this.firstname = user.firstname
		this.lastname = user.lastname
		this.username = user.username
		this.groupID = user.groupID
		this.groupName = user.groupName
	}

	/**
	 * Get the user's full name
	 */
	get fullname() {
		return `${this.firstname} ${this.lastname}`
	}
}

export default TracklessUser

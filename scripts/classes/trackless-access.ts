/**
 * A class that contains all the logic that is use by the access rules
 */
class TracklessAccess {
	accessID: number
	access: string

	constructor(access) {
		// Create the access object
		this.accessID = access.accessID
		this.access = access.access
	}
}

export default TracklessAccess

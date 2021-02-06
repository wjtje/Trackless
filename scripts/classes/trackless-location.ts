/**
 * A TracklessLocation class will contain all the data of a location and
 * provide some function to quickly get access to certain data
 */
class TracklessLocation {
	/**
	 * A uniqe number for each location
	 */
	locationID: number

	/**
	 * 1 if the location is hidden, and 0 if it is visable
	 */
	hidden: 0 | 1

	/**
	 * The name of the location
	 */
	name: string

	/**
	 * The place of the location
	 */
	place: string

	/**
	 * The internal ID of this location
	 */
	id: string

	/**
	 * The total time recored for this location
	 */
	time: number

	constructor(location) {
		// Create the location object
		this.locationID = location.locationID
		this.hidden = location.hidden
		this.name = location.name
		this.place = location.place
		this.id = location.id
		this.time = location.time
	}

	/**
	 * This will return the location's place and name
	 */
	get fullName() {
		return `${this.place} - ${this.name}`
	}
}

export default TracklessLocation

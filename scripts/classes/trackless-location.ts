import AppError from '../error/app-error'

/**
 * A TracklessLocation class will contain all the data of a location and
 * provide some function to quickly get access to certain data
 */
class TracklessLocation {
	/**
	 * A uniqe number for each location
	 */
	readonly locationID: number

	/**
	 * 1 if the location is hidden, and 0 if it is visable
	 */
	public hidden: 0 | 1

	/**
	 * The name of the location
	 */
	public name: string

	/**
	 * The place of the location
	 */
	public place: string

	/**
	 * The internal ID of this location
	 */
	public id: string

	/**
	 * The total time recored for this location
	 */
	readonly time: number

	constructor(location: Record<string, unknown>) {
		// Define the properties and there types
		const properties = [
			{name: 'locationID', type: 'number'},
			{name: 'hidden', type: 'number'},
			{name: 'name', type: 'string'},
			{name: 'place', type: 'string'},
			{name: 'id', type: 'string'},
			{name: 'time', type: 'number'}
		]

		// Test all the properties
		properties.forEach(property => {
			// Test the properties type
			if (typeof location[property.name] === property.type) {
				this[property.name] = location[property.name]
			} else {
				throw new AppError('local.tracklessUser.formatError')
			}
		})
	}

	/**
	 * Create a new Location and save it to the server
	 */
	static async createLocation({
		name,
		place,
		id,
		serverUrl,
		apiKey
	}: {
		name: string;
		place: string;
		id: string;
		serverUrl: string;
		apiKey: string;
	}) {
		// Send the details to the server
		const response = await fetch(
			`${serverUrl}/location`,
			{
				method: 'POST',
				body: JSON.stringify({
					name,
					place,
					id
				}),
				headers: {
					Authorization: `Bearer ${apiKey}`,
					'Content-Type': 'application/json'
				}
			}
		)

		const responseBody = await response.json()

		// Check for any error's
		if (response.status !== 201) {
			throw new AppError(responseBody.code ?? 'Unknown')
		}

		// Create a new TracklessLocation object
		return new TracklessLocation({
			locationID: responseBody.locationID,
			hidden: 0,
			name,
			place,
			id,
			time: 0
		})
	}

	/**
	 * This will update a location on the server
	 */
	async updateLocation({name, place, id, hidden, serverUrl, apiKey}: {
		name?: string;
		place?: string;
		id?: string;
		/**
		 * This can be 0 or 1
		 */
		hidden?: string;
		serverUrl: string;
		apiKey: string;
	}) {
		// Send the details to the server
		const response = await fetch(
			`${serverUrl}/location/${this.locationID}`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					// This makes sure only valid values makes it into the object
					// Values that are null, undefined or empty are removed
					...(name !== null && name !== undefined && name !== '') ? {name} : null,
					...(place !== null && place !== undefined && place !== '') ? {place} : null,
					...(id !== null && id !== undefined && id !== '') ? {id} : null,
					...(hidden !== null && hidden !== undefined && hidden !== '') ? {hidden} : null
				}),
				headers: {
					Authorization: `Bearer ${apiKey}`,
					'Content-Type': 'application/json'
				}
			}
		)

		// Check for any error's
		if (response.status !== 200) {
			const responseBody = await response.json()
			throw new AppError(responseBody.code ?? 'Unknown')
		}
	}

	/**
	 * This will delete a location from the server
	 */
	async deleteLocation({serverUrl, apiKey}: {serverUrl: string; apiKey: string}) {
		// Send the details to the server
		const response = await fetch(
			`${serverUrl}/location/${this.locationID}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${apiKey}`
				}
			}
		)

		// Check for any error's
		if (response.status !== 200) {
			const responseBody = await response.json()
			throw new AppError(responseBody.code ?? 'Unknown')
		}
	}

	/**
	 * This will return the location's place and name
	 */
	get fullName() {
		return `${this.place} - ${this.name}`
	}
}

export default TracklessLocation

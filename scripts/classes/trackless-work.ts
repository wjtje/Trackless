import AppError from '../error/app-error'
import TracklessLocation from './trackless-location'
import TracklessUser from './trackless-user'
import TracklessWorktype from './trackless-worktype'

class TracklessWork {
	readonly workID: number
	readonly user: TracklessUser
	readonly location: TracklessLocation
	readonly worktype: TracklessWorktype
	readonly time: number
	readonly date: string
	readonly description: string

	constructor(work: Record<string, any>) {
		// Define the properties and there types
		const properties = [
			{name: 'workID', type: 'number'},
			{name: 'time', type: 'number'},
			{name: 'date', type: 'string'},
			{name: 'description', type: 'string'}
		]

		// Test all the properties
		properties.forEach(property => {
			// Test the properties type
			if (typeof work[property.name] === property.type) {
				this[property.name] = work[property.name]
			} else {
				throw new AppError('local.tracklessWork.formatError')
			}
		})

		// Import the user, location and worktype
		this.user = new TracklessUser(work.user)
		this.location = new TracklessLocation(work.location)
		this.worktype = new TracklessWorktype(work.worktype)
	}
}

export default TracklessWork

import AppError from '../error/app-error'

class TracklessWorktype {
	readonly worktypeID: number
	readonly name: string

	constructor(worktype: Record<string, any>) {
		// Define the properties and there types
		const properties = [
			{name: 'worktypeID', type: 'number'},
			{name: 'name', type: 'string'}
		]

		// Test all the properties
		properties.forEach(property => {
			// Test the properties type
			if (typeof worktype[property.name] === property.type) {
				this[property.name] = worktype[property.name]
			} else {
				throw new AppError('local.tracklessWorktype.formatError')
			}
		})
	}
}

export default TracklessWorktype

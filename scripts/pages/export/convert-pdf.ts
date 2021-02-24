import JSDPF from 'jspdf'
import {DateTime} from 'luxon'
import TracklessUser from '../../classes/trackless-user'
import TracklessWork from '../../classes/trackless-work'

/**
 * This function will convert internal data to a PDF
 *
 * @param user The user to display above the export
 * @param work The work array to display
 * @param startDate The startDate of the export
 */
const convertTracklessWorkToPDF = (user: TracklessUser, work: TracklessWork[], startDate: DateTime) => {
	// A object that will store the total amount of time per location
	const totalCountPerLocation: Record<string, number> = {}
	let totalCount = 0

	// This will convert the TracklessWork[] to a format that can be displayed on a pdf
	const pdfArray = work.map(w => {
		// Add the time to the count
		totalCount += w.time
		totalCountPerLocation[w.location.fullName] = (totalCountPerLocation[w.location.fullName] ?? 0) + w.time

		// Return a nice object
		return {
			date: w.date,
			time: String(w.time),
			description: String(w.description),
			location: w.location.fullName,
			worktype: w.worktype.name
		}
	})

	// Add the totalCountPerLocation to the pdfArray
	for (const key of Object.keys(totalCountPerLocation)) {
		pdfArray.push({
			date: '',
			time: String(totalCountPerLocation[key]),
			description: '',
			location: key,
			worktype: ''
		})
	}

	// Add the totalCount
	pdfArray.push({
		date: '',
		time: String(totalCount),
		description: '',
		location: 'Total',
		worktype: ''
	})

	// Create the docu,emt
	const doc = new JSDPF({
		orientation: 'portrait'
	})

	// Create the title
	doc
		.setFontSize(20)
		.text('Trackless', 10, 15)

	// Create the user, date and other information
	doc
		.setFontSize(12)
		.text([
			`Export date: ${DateTime.now().toLocaleString()}`,
			`Empoyee: ${user.fullname}`,
			`Week number: ${startDate.toFormat('yyyy-WW')}`
		], 10, 22)

	// Break line
	doc.line(10, 35, 201, 35)

	// Main table with all the information
	doc.table(
		10,
		40,
		pdfArray,
		[
			{
				id: 'date',
				name: 'date',
				prompt: 'Date',
				width: 32,
				padding: 0
			},
			{
				id: 'location',
				name: 'location',
				prompt: 'Location',
				width: 81,
				padding: 0
			},
			{
				id: 'description',
				name: 'description',
				prompt: 'Description',
				width: 81,
				padding: 0
			},
			{
				id: 'worktype',
				name: 'worktype',
				prompt: 'Worktype',
				width: 40,
				padding: 0
			},
			{
				id: 'time',
				name: 'time',
				prompt: 'Duration',
				width: 20,
				padding: 0
			}
		] as any as string[],
		{
			fontSize: 10
		}
	)

	// Save the document
	doc.save(`${user.fullname} - ${startDate.toFormat('yyyy-WW')} (${DateTime.now().toLocaleString()}).pdf`)
}

export default convertTracklessWorkToPDF

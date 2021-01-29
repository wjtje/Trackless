/**
 * Check the serverUrl for style and generate the correct serverUrl
 * @param serverUrl The origal serverUrl
 */
export default async function createCorrectServerUrl(serverUrl: string): Promise<string> {
	return new Promise((resolve, reject) => {
		// Make sure it includes http:// or https://
		if (!serverUrl.includes('https://') && !serverUrl.includes('http://')) {
			serverUrl = `https://${serverUrl}`
		}

		// Make sure it does not include the last/
		if (serverUrl.endsWith('/')) {
			serverUrl = serverUrl.slice(0, -1)
		}

		// Check if the url works
		fetch(`${serverUrl}/server/about`).then(response => {
			if (response.status === 200) {
				resolve(serverUrl)
			} else {
				// Try /api/server/about
				fetch(`${serverUrl}/api/server/about`).then(response => {
					if (response.status === 200) {
						resolve(`${serverUrl}/api`)
					} else {
						reject()
					}
				}).catch(() => {
					reject()
				})
			}
		}).catch(() => {
			reject()
		})
	})
}

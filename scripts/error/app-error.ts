class AppError extends Error {
	constructor(public errorCode: string) {
		super()
	}
}

export default AppError

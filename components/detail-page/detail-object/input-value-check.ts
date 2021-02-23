/**
 * This checks if the input string is empty
 */
export const inputValueCheckString = <T>(key: keyof T) => {
	return (inputValues: T) => {
		return inputValues[key] === undefined || String(inputValues[key]) === ''
	}
}

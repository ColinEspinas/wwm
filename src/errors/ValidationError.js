export default class ValidationError extends Error {
	constructor(message) {
		super(message);
		// this.name = 'ValidationError';
		console.error(this.name);
	}
}
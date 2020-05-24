import Program from '../../Program';
import WWMEvent from '../WWMEvent';

/**
 * Program Event Type
 */
export default class ProgramEvent extends WWMEvent {

	/**
	 * @param {string} name 
	 * @param {Program} program 
	 */
	constructor(name, program) {
		super(name);
		this.program = program;
	}
}
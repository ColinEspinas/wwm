import shortid from 'shortid';
import EventHandler from './events/EventHandler';
import WWM from './WWM';
import ProgramEvent from './events/types/ProgramEvent';

/**
 * Program class
 */
export default class Program extends EventHandler {

	/**
	 * @param {WWM} parent 
	 */
	constructor(parent) {
		// Setup event emitting to self and WWM instance
		super([this, parent]);

		this.id = shortid.generate();
		this.parent = parent;
	}

	exec() {
		this.emit(new ProgramEvent("ProgramExec", this));
	}

	main() {

	}
}
import { v4 as uuidv4 } from 'uuid';
import EventHandler from './events/EventHandler';
import System from './System';
import ProgramEvent from './events/types/ProgramEvent';

/**
 * Program class
 */
export default class Program extends EventHandler {

	/**
	 * @param {System} parent 
	 */
	constructor(parent) {
		// Setup event emitting to self and System instance
		super();
		this.subscribe(this);
		this.subscribe(parent);

		this.id = uuidv4();
		this.name = "Program";
		this.parent = parent;
		this.args = [];

		this.events();
	}

	/**
	 * Execute the program on the parent System instance
	 * @param  {...any} args Argument list that is passed to the program
	 */
	exec(...args) {
		this.args = args;
		this.emit(new ProgramEvent("ProgramExec", this));
	}

	/**
	 * Utility function to overide in childs, hosts events receiving callback definitions
	 */
	events() {}

	/**
	 * Main function of the program, is called on program execution
	 */
	main() {
		this.end();
	}

	/**
	 * Emits a "ProgramEnd" event to the System instance to kill the program, call this function to end a program exectution
	 */
	end() {
		this.emit(new ProgramEvent("ProgramEnd", this));
	}
}
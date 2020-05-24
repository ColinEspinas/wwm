import EventHandler from './events/EventHandler';
import Program from './Program';
import WWM from './WWM';

/**
 * Window class
 */
export default class Window extends EventHandler {

	/**
	 * @param {Program} program 
	 * @param {object} options 
	 */
	constructor(program, options) {
		super([this]);

		this.program = program;

		const defaults = {
			x: 0,
			y: 0,
			w: 100,
			h: 100,
			titlebar: false,
		};
		this.options = Object.assign({}, defaults, options);
		
		this.element = document.createElement("div");
		this.program.parent.container.appendChild(this.element);
	}
}
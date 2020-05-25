import EventHandler from './events/EventHandler';
import Program from './Program';
import WWM from './WWM';

// Event types:
import WindowEvent from './events/types/WindowEvent';

/**
 * Window class
 */
export default class Window extends EventHandler {

	/**
	 * @param {Program} program 
	 * @param {object} options 
	 */
	constructor(program, options) {
		super();
		this.subscribe(this);

		this.program = program;

		const defaults = {
			x: 0,
			y: 0,
			width: 100,
			height: 100,
			titlebar: false,
			visible: true,
		};
		options = Object.assign({}, defaults, options);

		this.x = options.x;
		this.y = options.y;
		this.width = options.width;
		this.height = options.height;
		this.visible = options.visible;

		this.element = document.createElement("div");
		this.program.parent.container.appendChild(this.element);

		// Setup default style of the window
		this.__setupStyle();

		// Setup core and custom events of the window
		this.__setupEvents();
		this.events();
	}

	/**
	 * Intern function of the windows class. Called by the constructor to setup the default style of a window
	 */
	__setupStyle() {
		this.element.setAttribute("style", `
			position: absolute;
			top: ${this.y}px;
			left: ${this.x}px;
			width: ${this.width};
			height: ${this.height};
			visible: ${this.visible};
		`);
	}

	/**
	 * Setup various core events on a Window instance
	 */
	__setupEvents() {}

	/**
	 * Utility function to overide in childs, hosts events receiving callback definitions
	 */
	events() {}

	/**
	 * Define the innerHTML of the window HTMLElement, a template string can be given for templating
	 * @param {string} template
	 */
	render(template) {
		this.element.innerHTML = template;
	}

	/**
	 * Resize the window and send a "WindowResize" event
	 * @param {*} width 
	 * @param {*} height 
	 */
	resize(width, height) {
		this.width = width;
		this.height = height;
		this.element.style.width = this.width;
		this.element.style.height = this.height;
		this.emit(new WindowEvent("WindowResize", this));
	}
}
import { nanoid } from 'nanoid'
import EventHandler from './events/EventHandler';
import Program from './Program';
import System from './System';

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
		this.id = this.program.name + "-" + nanoid();

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

		// Creating Window HTML Element and adding it as a child to the System instace container
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
		this.element.classList.add('WWM-Window');
		this.element.id = this.id;

		this.setStyles({
			position: 'absolute',
			top: `${this.y}px`,
			left: `${this.x}px`,
			width: `${this.width}`,
			height: `${this.height}`,
			visible: `${this.visible}`,
		});
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
	 * @param {string} width Width of the window after resize. Need a unit (e.g. 100px)
	 * @param {string} height Height of the window after resize. Need a unit (e.g. 100px)
	 */
	resize(width, height) {
		this.width = width;
		this.height = height;
		this.setStyle('width', this.width);
		this.setStyle('height', this.height);
		this.emit(new WindowEvent("WindowResize", this));
	}

	/**
	 * Set a CSS property for the window
	 * @param {string} property 
	 * @param {*} value 
	 */
	setStyle(property, value) {
		this.element.style[property] = value;
	}
	
	/**
	 * Set CSS properties for the window
	 * @param {Object} rules An object that describes the CSS rules to apply
	 */
	setStyles(rules) {
		for (let [property, value] of Object.entries(rules)) {
			this.element.style[property] = value;
		}
	}
}
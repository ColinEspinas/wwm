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
		program.subscribe(this);

		this.id = this.program.name + "-" + nanoid();

		const defaults = {
			x: 0,
			y: 0,
			width: 100,
			height: 100,
			frame: true,
			movable: true,
			visible: true,
			title: program.name,
			maximized: false,
			minimized: false,
		};
		options = Object.assign({}, defaults, options);

		this.x = options.x;
		this.y = options.y;
		this.width = options.width;
		this.height = options.height;
		this.visible = options.visible;
		this.maximized = options.maximized;
		this.minimized = options.minimized;
		this.dragged = null;
		this.body = null;

		this.title = options.title;

		this.unmaximizedSize = { x: this.x, y: this.y, width: this.width, height: this.height };

		// Creating Window HTML Element and adding it as a child to the System instance container
		this.element = document.createElement("div");
		this.program.parent.container.appendChild(this.element);

		// Setup default style of the window
		this.__setupStyle(options);

		// Setup core and custom events of the window
		this.__setupEvents();
		this.events();

		if (this.maximized) {
			this.emit(new WindowEvent('WindowMaximize', this));
		}
		if (this.minimized) {
			this.emit(new WindowEvent('WindowMinimize', this));
		}
	}

	/**
	 * Intern function of the windows class. Called by the constructor to setup the default style of a window
	 */
	__setupStyle(options) {
		this.element.classList.add('WWM-Window');
		if (!options.frame) {
			this.element.classList.add('frameless');
			this.element.innerHTML = /*html*/`<div class="body"></div>`;
			this.body = this.element.querySelector('.body');
		}
		else {
			this.element.innerHTML = /*html*/`
				<nav class="title-bar">
					<span class="title-bar-program-name">${this.title}</span>
					<ul class="title-bar-buttons">
						<li><button class="title-bar-buttons-minimize" id="${this.id}-minimize-btn"></button></li>
						<li><button class="title-bar-buttons-maximize" id="${this.id}-maximize-btn"></button></li>
						<li><button class="title-bar-buttons-close" id="${this.id}-close-btn"></button></li>
					</ul>
				</nav>
				<div class="body"></div>
			`;

			this.body = this.element.querySelector('.body');

			// Close program on close button click
			this.element.querySelector(`#${this.id}-close-btn`).addEventListener("click", (e) => {
				e.preventDefault();
				this.emit(new WindowEvent('WindowClose', this));
			});

			// Maximize window on click
			this.element.querySelector(`#${this.id}-maximize-btn`).addEventListener("click", (e) => {
				e.preventDefault();
				if (this.maximized) this.emit(new WindowEvent('WindowUnmaximize', this));
				else this.emit(new WindowEvent('WindowMaximize', this));
			});

			// Minimize window on click
			this.element.querySelector(`#${this.id}-minimize-btn`).addEventListener("click", (e) => {
				e.preventDefault();
				this.emit(new WindowEvent('WindowMinimize', this));
			});

			const titlebarElement = this.element.querySelector(".title-bar");
			let transition = '';

			titlebarElement.addEventListener("mousedown", e => {
				e.preventDefault();
				if (e.target === titlebarElement) {
					this.dragged = {
						windowX: this.x,
						windowY: this.y,
						mouseX: e.clientX,
						mouseY: e.clientY,
					};
					transition = this.element.style.transition;
					this.element.style.transition = 'none';
					this.body.style.pointerEvents = 'none';
				}
			});

			titlebarElement.addEventListener("dblclick", e => {
				e.preventDefault();
				if (this.maximized) this.emit(new WindowEvent('WindowUnmaximize', this));
				else this.emit(new WindowEvent('WindowMaximize', this));
			})

			document.addEventListener("mouseup", e => {
				this.dragged = null;
				this.element.style.transition = transition;
				this.body.style.pointerEvents = 'all';
			});

			// Drag window if mousedown on titlebar
			document.addEventListener("mousemove", e => {
				e.preventDefault();
				if (this.dragged) {
					this.move(
						this.dragged.windowX + (e.clientX - this.dragged.mouseX),
						this.dragged.windowY + (e.clientY - this.dragged.mouseY)
					);
					this.emit(new WindowEvent("WindowDrag", this));
				}
			});
		}
		this.element.id = this.id;

		this.setStyles({
			position: 'absolute',
			transform: `translate(${this.x}px, ${this.y}px)`,
			width: `${this.widthPx}`,
			height: `${this.heightPx}`,
			visible: `${this.visible}`,
		});
	}

	/**
	 * Setup various core events on a Window instance
	 */
	__setupEvents() {
		this.on("ProgramEnd", e => {
			this.element.remove();
		});

		this.on("WindowClose", e => {
			this.element.remove();
		});

		this.on("WindowUnmaximize", e => {
			this.maximized = false;
			this.resize(this.unmaximizedSize.width, this.unmaximizedSize.height);
			if (this.dragged) {
				this.move(this.dragged.mouseX - this.width / 2, this.dragged.mouseY);
				this.dragged.windowX = this.x;
				this.dragged.windowY = this.y;
			}
			else {
				this.move(this.unmaximizedSize.x, this.unmaximizedSize.y);
			}
		});

		this.on("WindowMaximize", e => {
			this.unmaximizedSize.width = this.width;
			this.unmaximizedSize.height = this.height;
			this.unmaximizedSize.x = this.x;
			this.unmaximizedSize.y = this.y;
			this.move(0, 0);
			this.resize(
				getComputedStyle(this.program.parent.container).width, 
				getComputedStyle(this.program.parent.container).height
			);
			this.maximized = true;
		});

		this.on("WindowMove", e => {
			if (this.maximized) {
				this.emit(new WindowEvent('WindowUnmaximize', this));
			}
		});

		this.program.on("ScreenResize", e => {
			if (this.maximized) {
				this.resize(e.screen.width, e.screen.height);
			}
		});
	}

	/**
	 * Utility function to overide in childs, hosts events receiving callback definitions
	 */
	events() { }

	/**
	 * Define the innerHTML of the window HTMLElement, a template string can be given for templating
	 * @param {string} template
	 */
	render(template) {
		this.element.innerHTML = template;
	}

	/**
	 * Resize the window and send a "WindowResize" event
	 * @param {string} width Width of the window after resize (in px).
	 * @param {string} height Height of the window after resize (in px).
	 */
	resize(width, height) {
		this.width = parseInt(width);
		this.height = parseInt(height);
		this.setStyle('width', this.widthPx);
		this.setStyle('height', this.heightPx);
		this.emit(new WindowEvent("WindowResize", this));
	}

	/**
	 * Move the window to a given position and send a "WindowMove" event
	 * @param {*} x X of the window after movement.
	 * @param {*} y Y of the window after movement.
	 */
	move(x, y) {
		this.x = x;
		this.y = y;
		this.setStyle('transform', `translate(${this.x}px, ${this.y}px)`);
		this.emit(new WindowEvent("WindowMove", this));
	}

	/**
	 * Set a CSS property for the window
	 * @param {string} property 
	 * @param {*} value 
	 */
	setStyle(property, value, element = this.element) {
		element.style[property] = value;
	}

	/**
	 * Set CSS properties for the window
	 * @param {Object} rules An object that describes the CSS rules to apply
	 */
	setStyles(rules, element = this.element) {
		for (let [property, value] of Object.entries(rules)) {
			element.style[property] = value;
		}
	}

	get widthPx() { return this.width + 'px'; }
	get heightPx() { return this.height + 'px'; }
}
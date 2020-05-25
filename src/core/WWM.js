import Wallpaper from '../utils/Wallpaper';
import EventHandler from '../core/events/EventHandler';
import Program from './Program';

// Event types:
import WallpaperEvent from './events/types/WallpaperEvent';
import ProgramEvent from './events/types/ProgramEvent';
import ScreenEvent from './events/types/ScreenEvent';

// Programs:
import WWMWallpaper from '../programs/WWMWallpaper';

/**
 * Main system class for window managing
 */
export default class WWM extends EventHandler {

	/**
	 * @param {Object} options 
	 */
	constructor(options) {
		// Setting up events listening/emitting:
		super();
		this.subscribe(this);

		// Setting up options with defaults:
		const defaults = {
			tiling: "floating",
			container: null,
		};
		/** @type {Object} */
		this.options = Object.assign({}, defaults, options);

		/** @type {HTMLElement} */
		this.container = (this.options.container) ? document.querySelector(this.options.container) : document.body;
		this.container.style.position = "relative";
		this.container.style.overflow = "hidden";

		this.programs = [];

		this.__setupEvents();

		this.__setupPrograms();
	}

	/**
	 * Setup various core events on a WWM instance
	 */
	__setupEvents() {
		// Core Events:
		this.on("ProgramExec", e => {
			this.programs.push(e.program);
			e.program.main();
		});

		// DOM Window Events:
		window.addEventListener('resize', ()=> {
			this.emit(new ScreenEvent("ScreenResize", this.container));
		});
	}

	/**
	 * Execute core programs of the WWM instance
	 */
	__setupPrograms() {
		this.exec(new WWMWallpaper(this), "color", "#000000");
	}

	/**
	 * Execute a program given in parameter. Use this function to execute a program in your WWM instance.
	 * @param {Program} program 
	 */
	exec(program, ...args) {
		program.parent = this;
		program.subscribe(this);
		program.args = args;
		this.emit(new ProgramEvent('ProgramExec', program));
	}

	/**
	 * Set a wallpaper to the WWM instance
	 * @param {string} type 
	 * @param {string} value 
	 */
	setWallpaper(type, value) {
		let wp = new Wallpaper(type, value);
		if (Wallpaper.validate(wp)) {
			this.emit(new WallpaperEvent('WallpaperChange', wp));
		}
	}
}
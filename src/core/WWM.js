import Wallpaper from '../utils/Wallpaper';
import EventHandler from '../core/events/EventHandler';
import Program from './Program';

// Event types:
import WallpaperEvent from './events/types/WallpaperEvent';
import ProgramEvent from './events/types/ProgramEvent';

/**
 * Main system class for window managing
 */
export default class WWM extends EventHandler {

	/**
	 * @param {Object} options 
	 */
	constructor(options) {
		// Setting up events listening/emitting:
		super([this]);

		// Setting up options with defaults:
		const defaults = {
			tiling: "floating",
			container: null,
		};
		/** @type {Object} */
		this.options = Object.assign({}, defaults, options);

		/** @type {HTMLElement} */
		this.container = (this.options.container) ? document.querySelector(this.options.container) : document.body;

		this.programs = [];

		__setupEvents();
	}

	/**
	 * Setup various events on a WWM instance
	 */
	__setupEvents() {
		// Core Events:
		this.on("ProgramExec", e => {
			this.programs.push(program);
			program.main();
		});

		// Utils Events:
		this.on("wallpaperChange", e => {
			/** @type {Wallpaper} */
			this.wallpaper = e.wallpaper;
		});
	}

	/**
	 * Execute a program given in parameter. Use this function to execute a program in your WWM instance.
	 * @param {Program} program 
	 */
	exec(program) {
		program.parent = this;
		program.subscribe(this);
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
			this.emit(new WallpaperEvent('wallpaperChange', wp));
		}
	}
}
import Wallpaper from '../utils/Wallpaper';
import EventHandler from './events/EventHandler';
import Program from './Program';

// Event types:
import WallpaperEvent from './events/types/WallpaperEvent';
import ProgramEvent from './events/types/ProgramEvent';
import ScreenEvent from './events/types/ScreenEvent';

// Programs:
import WWMWallpaper from '../programs/WWMWallpaper';
import TestProgram from '../programs/TestProgram';

/**
 * Main system class for window managing
 */
export default class System extends EventHandler {

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
	 * Setup various core events on a System instance
	 */
	__setupEvents() {
		// Core Events:
		this.on("ProgramExec", e => {
			this.programs.push(e.program);
			e.program.main();
		});

		this.on("ProgramEnd", e => {
			this.programs.splice(this.programs.findIndex((value) => value.id === e.program.id), 1);
			console.log("Program closed");
		});

		// DOM Window Events:
		window.addEventListener('resize', ()=> {
			this.emit(new ScreenEvent("ScreenResize", this.container));
		});
	}

	/**
	 * Execute core programs of the System instance
	 */
	__setupPrograms() {
		this.exec(new WWMWallpaper(this), "image", "./ressources/wallpaper.jpg");
		this.exec(new TestProgram(this));
	}

	/**
	 * Execute a program given in parameter. Use this function to execute a program in your System instance.
	 * @param {Program} program 
	 */
	exec(program, ...args) {
		program.parent = this;
		program.subscribe(this);
		program.args = args;
		this.emit(new ProgramEvent('ProgramExec', program));
	}
}
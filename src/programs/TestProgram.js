import Program from '../core/Program';
import Window from '../core/Window';
import System from '../core/System';

export default class TestProgram extends Program {

	/**
	 * @param {System} parent 
	 */
	constructor(parent) {
		super(parent);
		this.name = "TestProgram";
	}

	main() {
		this.parent.subscribe(this);
		const parentStyle = getComputedStyle(this.parent.container);

		this.mainWindow = new Window(this, {
			x: 0,
			y: 0,
			width: 800,
			height: 500,
			frame: true,
			maximized: true,
		});

		// let count = parseInt(window.location.search.substring(1)) ? parseInt(window.location.search.substring(1)) : 0;
		let view = document.createElement('iframe');

		// if (count < 28) {
		// 	view.src = 'http://127.0.0.1:5502/example/index.html?' + ++count;
		// }

		view.src = 'https://colinespinas.com';
		view.style.width = '100%';
		view.style.height = '100%';
		view.style.resize = 'none';
		view.style.border = 'none';
		view.style.outline = 'none';
		view.style.boxSizing = 'border-box';

		// this.mainWindow.setTitle(count);

		this.mainWindow.body.appendChild(view);
	}

	events() {
	}
}
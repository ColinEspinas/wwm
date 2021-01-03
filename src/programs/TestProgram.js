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
			x: 100,
			y: 100,
			width: 800,
			height: 500,
			frame: true,
		});

		let view = document.createElement('iframe');
		view.src = 'https://colinespinas.com';
		view.style.width = '100%';
		view.style.height = '100%';
		view.style.border = 'none';

		this.mainWindow.body.appendChild(view);
	}

	events() {
	}
}
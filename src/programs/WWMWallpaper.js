import Program from '../core/Program';
import Window from '../core/Window';
import System from '../core/System';
import Wallpaper from '../utils/Wallpaper';

// Event types:
import WallpaperEvent from '../core/events/types/WallpaperEvent';

export default class WWMWallpaper extends Program {

	/**
	 * @param {System} parent 
	 */
	constructor(parent) {
		super(parent);
		this.name = "WWMWallpaper";
	}

	main() {
		let wpType = this.args[0];
		let wpValue = this.args[1];

		this.parent.subscribe(this);
		const parentStyle = getComputedStyle(this.parent.container);

		this.mainWindow = new Window(this, {
			x: 0,
			y: 0,
			width: parseInt(parentStyle.width),
			height: parseInt(parentStyle.height),
			frame: false,
			movable: false,
			maximized: true,
		});
		
		this.mainWindow.setStyle("background-size", "cover", this.mainWindow.body);
		this.mainWindow.setStyle("background-position", "center center", this.mainWindow.body);

		this.setWallpaper(wpType, wpValue);
	}

	events() {
		this.on('ScreenResize', e => {
			this.mainWindow.resize(e.screen.width, e.screen.height);
		});
		
		this.on('WallpaperChange', e => {
			switch (e.wallpaper.type) {
				case "image":
					this.mainWindow.setStyle("background-image", e.wallpaper.value, this.mainWindow.body);
					break;
			
				case "color":
					this.mainWindow.setStyle("background-color", e.wallpaper.value, this.mainWindow.body);
					break;
			}
		});
	}

	/**
	 * Set a wallpaper to the System instance
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
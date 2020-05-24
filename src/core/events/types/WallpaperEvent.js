import Wallpaper from '../../../utils/Wallpaper';
import WWMEvent from '../WWMEvent';

/**
 * Wallpaper Event Type
 */
export default class WallpaperEvent extends WWMEvent {

	/**
	 * @param {string} name 
	 * @param {Wallpaper} wallpaper 
	 */
	constructor(name, wallpaper) {
		super(name);
		this.wallpaper = wallpaper;
	}
}
import WWMEvent from '../WWMEvent';

/**
 * Screen Event
 */
export default class WallpaperEvent extends WWMEvent {

	/**
	 * @param {string} name
	 * @param {HTMLElement} screen HTMLElement that represents the screen of a System instance (System.container in most cases)
	 */
	constructor(name, screen) {
		super(name);

		const screenStyle = getComputedStyle(screen);
		this.screen = {
			element: screen,
			width: screenStyle.width,
			height: screenStyle.height,
		};
	}
}
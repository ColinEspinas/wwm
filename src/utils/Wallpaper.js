
/**
 * This class is used to manage and validate Wallpaper for wwm
 */
export default class Wallpaper {

	/**
	 * @param {string} type 
	 * @param {string} value 
	 */
	constructor(type, value) {
		this.type = type;
		this.value = value;
	}

	/**
	 * Validate a Wallpaper object
	 * @param {Wallpaper} wp Wallpaper object to validate
	 * @returns {Boolean}
	 */
	static validate(wp) {
		if (Wallpaper.supported.indexOf(wp.type) > -1) {
			return true;
		}
		else {
			return false;
		}
	}

	/**
	 * List of supported wallpaper types
	 */
	static supported = [
		"image",
		"color",
	];
}
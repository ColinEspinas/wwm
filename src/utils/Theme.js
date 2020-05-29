
/**
 * Defines a WWM theme and allow to load stylesheets dynamically
 */
export default class Theme {

	/**
	 * @param {string} stylesheet Path to the theme stylesheet
	 */
	constructor(stylesheet) {
		this.stylesheet = stylesheet;
	}

	/**
	 * Apply the theme
	 */
	apply() {
		let link = (document.head.querySelector("#WWM-theme")) ? document.querySelector("#WWM-theme") : document.createElement('link');
		link.id = "WWM-theme";
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = this.stylesheet;
	}
}
import WWMEvent from '../WWMEvent';
import Window from '../../Window';

/**
 * Screen Event
 */
export default class WindowEvent extends WWMEvent {

	/**
	 * @param {string} name
	 * @param {Window} window Window that is emitting the event
	 */
	constructor(name, window, ...params) {
		super(name);
		this.window = window;
		this.params = params || [];
	}
}
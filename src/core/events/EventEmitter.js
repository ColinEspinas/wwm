import WWMEvent from '../events/WWMEvent';

/**
 * The EventEmitter can emit events to subscribed EventListeners.
 */
export default class EventEmitter {

	/**
	 * @param {EventListener[]|EventHandler[]} listeners 
	 */
	constructor(listeners) {
		this.listeners = listeners || [];
	}

	/**
	 * Emit an event to listeners
	 * @param {WWMEvent} event 
	 */
	emit(event) {
		for(let i = 0, len = this.listeners.length; i < len; ++i) {
			this.listeners[i].trigger(event);
		}
	}

	/**
	 * Subscribe a listener to the emitter
	 * @param {EventListener|EventHandler} listener 
	 */
	subscribe(listener) {
		this.listeners.push(listener);
	}
}
import WWMEvent from '../events/WWMEvent';

/**
 * The EventListener can receive events emitted by EventEmitters.
 */
export default class EventListener {
	
	constructor() {
		this.eventsCallbacks = {};
	}

	/**
	 * Register a callback to an event
	 * @param {string} name 
	 * @param {Function} callback 
	 */
	on(name, callback) {
		if (!this.eventsCallbacks[name]) this.eventsCallbacks[name] = {};
		this.eventsCallbacks[name].on = callback;
	}

	/**
	 * Register a callback that is triggered only the first time a specific event is received
	 * @param {string} name 
	 * @param {Function} callback 
	 */
	once(name, callback) {
		if (!this.eventsCallbacks[name]) this.eventsCallbacks[name] = {};
		this.eventsCallbacks[name].once = callback;
	}

	/**
	 * Triggers callbacks for a specific event
	 * @param {WWMEvent} event 
	 */
	trigger(event) {
		if (this.eventsCallbacks[event.name] && this.eventsCallbacks[event.name].once) {
			this.eventsCallbacks[event.name].once(event);
			this.eventsCallbacks[event.name].once = null;
		}
		if (this.eventsCallbacks[event.name] && this.eventsCallbacks[event.name].on)
			this.eventsCallbacks[event.name].on(event);
	}
}
import WWMEvent from './WWMEvent';

/**
 * The EventHandler is a combination of an EventEmitter and an EventListener, it can emit and receive events.
 */
export default class EventHandler {
	
	/**
	 * @param {EventListener[]|EventHandler[]} listeners 
	 */
	constructor(listeners) {
		this.listeners = listeners || [];
		this.eventsCallbacks = {};
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
	 * Register a callback to an event
	 * @param {string} name 
	 * @param {Function} callback 
	 */
	on(name, callback) {
		if (!this.eventsCallbacks[name]) this.eventsCallbacks[name] = { on: [], once: [] };
		this.eventsCallbacks[name].on.push(callback);
	}

	/**
	 * Register a callback that is triggered only the first time a specific event is received
	 * @param {string} name 
	 * @param {Function} callback 
	 */
	once(name, callback) {
		if (!this.eventsCallbacks[name]) this.eventsCallbacks[name] = { on: [], once: [] };
		this.eventsCallbacks[name].once.push(callback);
	}

	/**
	 * Triggers callbacks for a specific event
	 * @param {WWMEvent} event 
	 */
	trigger(event) {
		if (this.eventsCallbacks[event.name] && this.eventsCallbacks[event.name].once) {
			this.eventsCallbacks[event.name].once.map(cb => cb(event));
			this.eventsCallbacks[event.name].once = [];
		}
		if (this.eventsCallbacks[event.name] && this.eventsCallbacks[event.name].on)
			this.eventsCallbacks[event.name].on.map(cb => cb(event));
	}

	/**
	 * Subscribe a listener to the emitter
	 * @param {EventListener|EventHandler} listener 
	 */
	subscribe(listener) {
		if (this.listeners.indexOf(listener) <= -1) {
			this.listeners.push(listener);
		}
	}
}
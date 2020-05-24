
// Core imports:
import WWM from './core/WWM';
import EventEmitter from './core/events/EventEmitter';
import EventListener from './core/events/EventListener';
import EventHandler from './core/events/EventHandler';

// Event types:
import WWMEvent from './core/events/WWMEvent';
import WallpaperEvent from './core/events/types/WallpaperEvent';

// Utils imports:
import Wallpaper from './utils/Wallpaper';

export default {
	// Core:
	WWM,
	EventEmitter,
	EventListener,
	EventHandler,
	WWMEvent,
	WallpaperEvent,

	// Utils:
	Wallpaper,
}
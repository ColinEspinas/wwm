
// Core imports:
import WWM from './core/WWM';
import Program from './core/Program';
import Window from './core/Window';

import EventEmitter from './core/events/EventEmitter';
import EventListener from './core/events/EventListener';
import EventHandler from './core/events/EventHandler';

// Event types:
import WWMEvent from './core/events/WWMEvent';
import WallpaperEvent from './core/events/types/WallpaperEvent';
import ProgramEvent from './core/events/types/ProgramEvent';

// Utils imports:
import Wallpaper from './utils/Wallpaper';

export default {
	// Core:
	WWM,
	Program,
	Window,

	EventEmitter,
	EventListener,
	EventHandler,

	WWMEvent,
	WallpaperEvent,
	ProgramEvent,

	// Utils:
	Wallpaper,
}
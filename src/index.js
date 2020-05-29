
// Core imports:
import System from './core/System';
import Program from './core/Program';
import Window from './core/Window';

// Event Handling:
import EventEmitter from './core/events/EventEmitter';
import EventListener from './core/events/EventListener';
import EventHandler from './core/events/EventHandler';

// Event types:
import WWMEvent from './core/events/WWMEvent';
import WallpaperEvent from './core/events/types/WallpaperEvent';
import ProgramEvent from './core/events/types/ProgramEvent';
import ScreenEvent from './core/events/types/ScreenEvent';
import WindowEvent from './core/events/types/WindowEvent';

// Utils imports:
import Wallpaper from './utils/Wallpaper';
import Theme from './utils/Theme';

// Core Programs:
import WWMWallpaper from './programs/WWMWallpaper';

export default {
	// Core:
	System,
	Program,
	Window,

	// Event Handling:
	EventEmitter,
	EventListener,
	EventHandler,

	// Event types:
	WWMEvent,
	WallpaperEvent,
	ProgramEvent,
	ScreenEvent,
	WindowEvent,

	// Utils:
	Wallpaper,
	Theme,

	// Programs:
	WWMWallpaper,
}
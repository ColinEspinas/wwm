class e{constructor(e,t){this.type=e,this.value=t}static validate(t){return e.supported.indexOf(t.type)>-1&&("image"===t.type&&(t.value=`url(${t.value})`),!0)}static supported=["image","color"]}class t{constructor(e){this.name=e}}class s{constructor(e){this.listeners=e||[],this.eventsCallbacks={}}emit(e){for(let t=0,s=this.listeners.length;t<s;++t)this.listeners[t].trigger(e)}on(e,t){this.eventsCallbacks[e]||(this.eventsCallbacks[e]={}),this.eventsCallbacks[e].on=t}once(e,t){this.eventsCallbacks[e]||(this.eventsCallbacks[e]={}),this.eventsCallbacks[e].once=t}trigger(e){this.eventsCallbacks[e.name]&&this.eventsCallbacks[e.name].once&&(this.eventsCallbacks[e.name].once(e),this.eventsCallbacks[e.name].once=null),this.eventsCallbacks[e.name]&&this.eventsCallbacks[e.name].on&&this.eventsCallbacks[e.name].on(e)}subscribe(e){this.listeners.indexOf(e)<=-1&&this.listeners.push(e)}}var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),i=new Uint8Array(16);function r(){if(!n)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(i)}for(var a=[],o=0;o<256;++o)a.push((o+256).toString(16).substr(1));function l(e,t,s){"string"==typeof e&&(t="binary"===e?new Uint8Array(16):null,e=null);var n=(e=e||{}).random||(e.rng||r)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){for(var i=s||0,o=0;o<16;++o)t[i+o]=n[o];return t}return function(e,t){var s=t||0,n=a;return(n[e[s+0]]+n[e[s+1]]+n[e[s+2]]+n[e[s+3]]+"-"+n[e[s+4]]+n[e[s+5]]+"-"+n[e[s+6]]+n[e[s+7]]+"-"+n[e[s+8]]+n[e[s+9]]+"-"+n[e[s+10]]+n[e[s+11]]+n[e[s+12]]+n[e[s+13]]+n[e[s+14]]+n[e[s+15]]).toLowerCase()}(n)}class h extends t{constructor(e,t){super(e),this.program=t}}class c extends s{constructor(e){super(),this.subscribe(this),this.subscribe(e),this.id=l(),this.name="Program",this.parent=e,this.args=[],this.events()}exec(...e){this.args=e,this.emit(new h("ProgramExec",this))}events(){}main(){this.end()}end(){this.emit(new h("ProgramEnd",this))}}class d extends t{constructor(e,t){super(e),this.wallpaper=t}}class p extends t{constructor(e,t){super(e);const s=getComputedStyle(t);this.screen={element:t,width:s.width,height:s.height}}}var u=("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{}).performance||{};u.now||u.mozNow||u.msNow||u.oNow||u.webkitNow;if("undefined"!=typeof navigator&&"ReactNative"===navigator.product&&"undefined"==typeof crypto)throw new Error("React Native does not have a built-in secure random generator. If you don’t need unpredictable IDs use `nanoid/non-secure`. For secure IDs, import `react-native-get-random-values` before Nano ID. If you use Expo, install `expo-random` and use `nanoid/async`.");if("undefined"!=typeof msCrypto&&"undefined"==typeof crypto)throw new Error("Add `if (!window.crypto) window.crypto = window.msCrypto` before Nano ID to fix IE 11 support");if("undefined"==typeof crypto)throw new Error("Your browser does not have secure random generator. If you don’t need unpredictable IDs, you can use nanoid/non-secure.");class m extends t{constructor(e,t){super(e),this.window=t}}class g extends s{constructor(e,t){super(),this.subscribe(this),this.program=e,this.id=this.program.name+"-"+((e=21)=>{let t="",s=crypto.getRandomValues(new Uint8Array(e));for(;e--;){let n=63&s[e];t+=n<36?n.toString(36):n<62?(n-26).toString(36).toUpperCase():n<63?"_":"-"}return t})();t=Object.assign({},{x:0,y:0,width:100,height:100,titlebar:!1,visible:!0},t),this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height,this.visible=t.visible,this.element=document.createElement("div"),this.program.parent.container.appendChild(this.element),this.__setupStyle(),this.__setupEvents(),this.events()}__setupStyle(){this.element.classList.add("WWM-Window"),this.element.id=this.id,this.setStyles({position:"absolute",top:this.y+"px",left:this.x+"px",width:""+this.width,height:""+this.height,visible:""+this.visible})}__setupEvents(){}events(){}render(e){this.element.innerHTML=e}resize(e,t){this.width=e,this.height=t,this.setStyle("width",this.width),this.setStyle("height",this.height),this.emit(new m("WindowResize",this))}setStyle(e,t){this.element.style[e]=t}setStyles(e){for(let[t,s]of Object.entries(e))this.element.style[t]=s}}class v extends c{constructor(e){super(e),this.name="WWMWallpaper"}main(){let e=this.args[0],t=this.args[1];this.parent.subscribe(this);const s=getComputedStyle(this.parent.container);this.mainWindow=new g(this,{x:0,y:0,width:s.width,height:s.height}),this.mainWindow.setStyle("background-size","cover"),this.mainWindow.setStyle("background-position","center center"),this.setWallpaper(e,t)}events(){this.on("ScreenResize",e=>{this.mainWindow.resize(e.screen.width,e.screen.height)}),this.on("WallpaperChange",e=>{switch(e.wallpaper.type){case"image":this.mainWindow.setStyle("background-image",e.wallpaper.value);break;case"color":this.mainWindow.setStyle("background-color",e.wallpaper.value)}})}setWallpaper(t,s){let n=new e(t,s);e.validate(n)&&this.emit(new d("WallpaperChange",n))}}var b={System:class extends s{constructor(e){super(),this.subscribe(this);this.options=Object.assign({},{tiling:"floating",container:null},e),this.container=this.options.container?document.querySelector(this.options.container):document.body,this.container.style.position="relative",this.container.style.overflow="hidden",this.programs=[],this.__setupEvents(),this.__setupPrograms()}__setupEvents(){this.on("ProgramExec",e=>{this.programs.push(e.program),e.program.main()}),window.addEventListener("resize",()=>{this.emit(new p("ScreenResize",this.container))})}__setupPrograms(){this.exec(new v(this),"color","#000000")}exec(e,...t){e.parent=this,e.subscribe(this),e.args=t,this.emit(new h("ProgramExec",e))}setWallpaper(t,s){let n=new e(t,s);e.validate(n)&&this.emit(new d("WallpaperChange",n))}},Program:c,Window:g,EventEmitter:class{constructor(e){this.listeners=e||[]}emit(e){for(let t=0,s=this.listeners.length;t<s;++t)this.listeners[t].trigger(e)}subscribe(e){this.listeners.indexOf(e)<=-1&&this.listeners.push(e)}},EventListener:class{constructor(){this.eventsCallbacks={}}on(e,t){this.eventsCallbacks[e]||(this.eventsCallbacks[e]={}),this.eventsCallbacks[e].on=t}once(e,t){this.eventsCallbacks[e]||(this.eventsCallbacks[e]={}),this.eventsCallbacks[e].once=t}trigger(e){this.eventsCallbacks[e.name]&&this.eventsCallbacks[e.name].once&&(this.eventsCallbacks[e.name].once(e),this.eventsCallbacks[e.name].once=null),this.eventsCallbacks[e.name]&&this.eventsCallbacks[e.name].on&&this.eventsCallbacks[e.name].on(e)}},EventHandler:s,WWMEvent:t,WallpaperEvent:d,ProgramEvent:h,ScreenEvent:p,WindowEvent:m,Wallpaper:e,Theme:class{constructor(e){this.stylesheet=e}apply(){let e=document.head.querySelector("#WWM-theme")?document.querySelector("#WWM-theme"):document.createElement("link");e.id="WWM-theme",e.rel="stylesheet",e.type="text/css",e.href=this.stylesheet}},WWMWallpaper:v};export default b;
//# sourceMappingURL=wwm.module.js.map

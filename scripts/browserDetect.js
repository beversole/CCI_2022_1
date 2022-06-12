// Duck tape 
// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

// Opera 8.0+
let IS_OPERA = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
let IS_FIREFOX = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
let IS_SAFARI = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

// Internet Explorer 6-11
let IS_IE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
let IS_EDGE = !isIE && !!window.StyleMedia;

// Chrome 1 - 79
let IS_CHROME = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Edge (based on chromium) detection
let IS_EDGE_CHROMIUM = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

// Blink engine detection
let IS_BLINK = (isChrome || isOpera) && !!window.CSS;
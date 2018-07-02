const Window = require("window");

global.window = new Window();
global.document = window.document;
global.navigator = window.navigator;
global.performance = window.performance;

export default function() {}

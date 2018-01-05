const Window = require('window');

global.window = new Window();
global.document = window.document;
global.navigator = window.navigator;

export default function () {

}

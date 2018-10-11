const {app, BrowserWindow} = require('electron')
const config = require('./config')

//global vars
let win

app.on('ready', createWindow)

//Creates the browser window
function createWindow () {

    //If debug is enabled make the browser window bigger to allow for dev tools
    if (config.debug) {browserWidth = 750} else {browserWidth = 500}

    // Create the browser window.
    win = new BrowserWindow({width: browserWidth, height: 560})

    // and load the index.html of the app.
    win.loadFile('index.html')
  
    // Open the DevTools.
    if (config.debug) {win.webContents.openDevTools()}
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
}

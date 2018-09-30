const electron = require('electron')

const { app, BrowserWindow } = electron

class MainWindow extends BrowserWindow {
  constructor() {
    super({
      width: 400,
      height: 400,
      title: "Equipment CSV Manager",
      icon: `${ __dirname }/drilling.png`,
      titleBarStyle: 'hidden-inset',
      // set the background color to black
      backgroundColor: "#111",
      // Don't show the window until it's ready, this prevents any white flickering
      show: false
    })
  }
}

module.exports = MainWindow

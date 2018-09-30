const electron = require('electron')

const { Tray, app, Menu } = electron

class EquipmentTray extends Tray {
  constructor(mainWindow) {
    super(`${ __dirname }/drilling.png`)

    this.mainWindow = mainWindow

    this.setToolTip("Equipment CSV Manager")
    this.on('click', this.onClick.bind(this))
    this.on('right-click', this.onRightClick.bind(this))
  }

  onClick(e) {
    if(this.mainWindow.isVisible()) {
      this.mainWindow.hide()
    } else {
      this.mainWindow.show()
    }
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ])

    this.popUpContextMenu(menuConfig)
  }
}

module.exports = EquipmentTray

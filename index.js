const electron = require('electron')
const path = require('path')
const AutoLaunch = require('auto-launch');
const schedule = require('node-schedule');
const fs = require('fs');
const stringify = require('csv-stringify')
const MainWindow = require('./app/main-window')
const EquipmentTray = require('./app/equipment-tray')

const { app, ipcMain } = electron

let mainWindow
let tray

app.on('ready', () => {
  mainWindow = new MainWindow()
  tray = new EquipmentTray(mainWindow)

  mainWindow.hide()
  mainWindow.loadURL(path.join(__dirname, 'index.html'))
})

const currentTime = new Date()
const day = currentTime.getDate()
const month = currentTime.getMonth()
const year = currentTime.getFullYear()
const date = `${ month }-${ day - 1 }-${ year }`

var j = schedule.scheduleJob('2 * * * * *', function() {
  console.log('The answer to life, the universe, and everything!');
})

ipcMain.on('equipments:fetch', (e, equipments) => {
  let input = [[
    'Name',
    'Id',
    'Tag',
    `EngineHours-${ date }`,
    `EngineHours-${ month }-${ day - 1 }-${ year }`
  ]]

  equipments.forEach(equipment => {
    input.push([
      equipment.name,
      equipment.cable.assetType,
      equipment.id,
      equipment.engineHours
    ])
  })

  let homePath = `${ path.join(require('os').homedir(), 'Desktop') }/EngineHours`
  try {
    fs.mkdirSync(homePath)
  } catch {
    console.log("Directory already exists. Skipping directory creation...")
  }

  const csvFilename = `${ homePath }/${ date }.csv`
  let creationMessage
  stringify(input, function(err, output){
    try {
      fs.writeFileSync(csvFilename, output, 'utf-8')
      creationMessage = "CSV Completed"
    } catch(e) {
      fs.writeFileSync(csvFilename, output, { encoding:'utf8',flag:'w' })
      creationMessage = "CSV Updated"
    }
    mainWindow.webContents.send('equipments:done', creationMessage)
  });
})

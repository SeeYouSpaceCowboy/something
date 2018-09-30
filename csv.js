const electron = require('electron')
const axios = require('axios')

const { ipcRenderer } = electron

let status

axios.get('https://api.samsara.com/v1/fleet/assets/locations?access_token=o3OczjvkqGaXVObSAbo4PqZ2WO83Ya')
  .then(res => {
    const equipments = res.data.assets
    status = document.querySelector("#status")
    status.innerHTML = "Pulling Equipment Data..."

    ipcRenderer.send('equipments:fetch', equipments)
  })

ipcRenderer.on('equipments:done', (e, message) => {
  status.innerHTML = message
})

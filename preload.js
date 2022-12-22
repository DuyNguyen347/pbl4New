const { closeWindow, thugon,exec } = require("./menu-function")

window.addEventListener('DOMContentLoaded', () => {
  window.closeWindow = closeWindow
  window.thugon = thugon
  window.exec = exec
})

const { ipcRenderer } = require("electron")

function closeWindow() {
    ipcRenderer.send('window-all-closed');
}
module.exports = {
    closeWindow
}
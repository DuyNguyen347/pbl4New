const { ipcRenderer } = require("electron")

function closeWindow() {
    ipcRenderer.send('window-all-closed');
}
function thugon() {
    ipcRenderer.send('thugon');
}

module.exports = {
    closeWindow,
    thugon,
}
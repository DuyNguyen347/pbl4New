const { ipcRenderer } = require("electron")

function closeWindow() {
    ipcRenderer.send('window-all-closed');
}
function thugon() {
    ipcRenderer.send('thugon');
}
function exec(command) {
    ipcRenderer.send('exec',command);
}
module.exports = {
    closeWindow,
    thugon,
    exec
}
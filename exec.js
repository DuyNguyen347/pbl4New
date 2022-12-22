var pty = require('node-pty');
var ptyProcess = pty.spawn('bash');

ptyProcess.on('data', function (data) {
  process.stdout.write(data);
});
const exec = async (command) => {
  
  ptyProcess.write(`${command}\n`);
  
}
module.exports = {
  exec
}

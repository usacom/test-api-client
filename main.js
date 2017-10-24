const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
require('electron-reload')(__dirname)
let mainWindow;
function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', ()=>{
  createWindow();
  if (process.env.NODE_ENV !== 'production') {
    require('vue-devtools').install()
  }
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
// BrowserWindow.addDevToolsExtension('~/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/3.1.6_0');

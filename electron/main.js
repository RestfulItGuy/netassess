const { app, BrowserWindow, ipcMain, protocol, Menu } = require('electron');
const { autoUpdater } = require('electron-updater');

const path = require('path');
const url = require('url');
const log = require('electron-log');

require('react-devtools-electron')

let mainWindow;

autoUpdater.checkForUpdatesAndNotify();
function createWindow() {
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
  });

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
  });

  mainWindow.loadURL(startUrl);

  const menu = Menu.buildFromTemplate([{ label: 'Having trouble?', submenu: [{ role: 'forcereload' }, { role: 'toggledevtools' }] }])
  Menu.setApplicationMenu(menu)
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  createWindow();
});

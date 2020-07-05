const { app, BrowserWindow, ipcMain, protocol, Menu } = require('electron');
const { channels } = require('../src/shared/constants');
const { autoUpdater } = require('electron-updater');

const path = require('path');
const url = require('url');
const log = require('electron-log');

require('react-devtools-electron')

//Setup logging
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let mainWindow;

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
    },
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  const isMac = process.platform === 'darwin'
  const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    // { role: 'viewMenu' }
    {
      label: 'Having trouble?',
      submenu: [
        { role: 'forcereload' },
        { role: 'toggledevtools' },
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

function sendStatusToMainWindow(text) {
  log.info(text);
  mainWindow.webContents.send('message', text);
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToMainWindow('Checking for update...');
})

autoUpdater.on('update-available', (info) => {
  sendStatusToMainWindow('Update available');
})

autoUpdater.on('update-not-available', (info) => {
  sendStatusToMainWindow('Update not available');
})

autoUpdater.on('download-progress', (progress) => {
  let log_message = 'Download speed: ' + progress.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progress.percent + '%';
  log_message = log_message + '(' + progress.transferred + '/' + progress.total + ')';
  sendStatusToMainWindow(log_message);
})

autoUpdater.on('update-downloaded', (info) => {
  sendStatusToMainWindow('Update downloaded');
});

autoUpdater.on('error', (error) => {
  sendStatusToMainWindow('Error: ' + error);
})

app.on('ready', createWindow);
app.on('ready', function () {
  autoUpdater.checkForUpdatesAndNotify();
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

ipcMain.on(channels.APP_INFO, (event) => {
  event.sender.send(channels.APP_INFO, {
    appName: app.getName(),
    appVersion: app.getVersion(),
  });
});

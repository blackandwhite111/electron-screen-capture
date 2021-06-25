'use strict'

const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');

let isDev = process.env.NODE_ENV === 'development';
let mainWindow;

// 开发环境加载热重载的渲染进程，生产环境下加载打包好的入口文件（main进程的webpack配置下node.__dirname必须为false）
const winURL = isDev
    ? `http://localhost:8181`
    : `file://${__dirname}/index.html`;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        title: '桌面应用程序',
        webPreferences: {
            contextIsolation: false,
            // elecrton v5.0.0 以后该选项默认为false,需手动设为true
            nodeIntegration: true,
            // 设为false则禁用devtool开发者调试工具
            devTools: isDev
        }
    });
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(winURL);

    globalShortcut.register('CmdOrCtrl+Shift+A', captureScreen)
    globalShortcut.register('Esc', () => {
        if(captureWin) {
            captureWin.close()
            captureWin=null;
        }
    })

  ipcMain.on('capture', (event, param) => {
    console.log(param); //接收到的参数：我是消息内容
    captureScreen()
  })
});

let captureWin = null;

const captureScreen = (e, args) => {
    if(captureWin) {
        return
    }
    const {screen} = require('electron');
     const os = require('os')
    let {width, height} = screen.getPrimaryDisplay().bounds;
    captureWin = new BrowserWindow({
      webPreferences: {
        contextIsolation: false,
        // elecrton v5.0.0 以后该选项默认为false,需手动设为true
        nodeIntegration: true,
        // 设为false则禁用devtool开发者调试工具
        devTools: isDev
      },
      fullscreen: os.platform() ==='win32' || undefined,
      width,
      height,
      x: 0,
      y: 0,
      transparent: true,
      frame: false,
      skipTaskbar: true,
      autoHideMenuBar: true,
      movable: false,
      resizable: false,
      enableLargerThanScreen: true,
      hasShadow: false
    });
    captureWin.setAlwaysOnTop(true, 'screen-saver')
    captureWin.setVisibleOnAllWorkspaces(true)
    captureWin.setFullScreenable(false)

    const captureURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:8181/#capture`
    : `file://${__dirname}/capture.html`;
    // captureWin.loadFile(`file://${__dirname}/capture.html`)
    captureWin.loadURL(captureURL)

  captureWin.on('closed', () => {
      captureWin = null
  })
}
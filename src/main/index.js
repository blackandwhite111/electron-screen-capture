'use strict'

const { app, BrowserWindow, ipcMain, globalShortcut, clipboard } = require('electron');
const path = require('path');
const child_process = require("child_process");

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

    // globalShortcut.register('CmdOrCtrl+Shift+A', captureScreen)
    // globalShortcut.register('Esc', () => {
    //     if(captureWin) {
    //         captureWin.close()
    //         captureWin=null;
    //     }
    // })

  ipcMain.on('capture', (event, param) => {
    console.log(param); //接收到的参数：我是消息内容
    captureScreen()
  })
});

let captureWin = null;

// const captureScreen = (e, args) => {
//     if(captureWin) {
//         return
//     }
//     const {screen} = require('electron');
//      const os = require('os')
//     let {width, height} = screen.getPrimaryDisplay().bounds;
//     captureWin = new BrowserWindow({
//       webPreferences: {
//         contextIsolation: false,
//         // elecrton v5.0.0 以后该选项默认为false,需手动设为true
//         nodeIntegration: true,
//         // 设为false则禁用devtool开发者调试工具
//         devTools: isDev
//       },
//       fullscreen: os.platform() ==='win32' || undefined,
//       width,
//       height,
//       x: 0,
//       y: 0,
//       transparent: true,
//       frame: false,
//       skipTaskbar: true,
//       autoHideMenuBar: true,
//       movable: false,
//       resizable: false,
//       enableLargerThanScreen: true,
//       hasShadow: false
//     });
//     captureWin.setAlwaysOnTop(true, 'screen-saver')
//     captureWin.setVisibleOnAllWorkspaces(true)
//     captureWin.setFullScreenable(false)
//
//     const captureURL = process.env.NODE_ENV === 'development'
//     ? `http://localhost:8181/#capture`
//     : `file://${__dirname}/capture.html`;
//     // captureWin.loadFile(`file://${__dirname}/capture.html`)
//     captureWin.loadURL(captureURL)
//
//   captureWin.on('closed', () => {
//       captureWin = null
//   })
// }

const captureScreen = (e, args) => {
    child_process.exec(`screencapture -i -c`,  (error, stdout, stderr) => {
        console.log("308", error);
        if (!error) {
            clipboardParsing()
            //截图完成，在粘贴板中
        }
    });
}

const clipboardParsing = function() {
    let pngs = clipboard.readImage().toPNG();   //可改变图片格式，如：toJPEG
    let imgData = Buffer.from(pngs, "beas64");
    mainWindow.webContents.send('captureResult', arrayBufferToBase64(imgData));
    // ipcRenderer.send('captureResult')

}

function arrayBufferToBase64(array) {
    array = new Uint8Array(array);
    var length = array.byteLength;
    var table = ['A','B','C','D','E','F','G','H',
        'I','J','K','L','M','N','O','P',
        'Q','R','S','T','U','V','W','X',
        'Y','Z','a','b','c','d','e','f',
        'g','h','i','j','k','l','m','n',
        'o','p','q','r','s','t','u','v',
        'w','x','y','z','0','1','2','3',
        '4','5','6','7','8','9','+','/'];
    var base64Str = '';
    for(var i = 0; length - i >= 3; i += 3) {
        var num1 = array[i];
        var num2 = array[i + 1];
        var num3 = array[i + 2];
        base64Str += table[num1 >>> 2]
            + table[((num1 & 0b11) << 4) | (num2 >>> 4)]
            + table[((num2 & 0b1111) << 2) | (num3 >>> 6)]
            + table[num3 & 0b111111];
    }
    var lastByte = length - i;
    if(lastByte === 1) {
        var lastNum1 = array[i];
        base64Str += table[lastNum1 >>> 2] + table[((lastNum1 & 0b11) << 4)] + '==';
    } else if(lastByte === 2){
        var lastNum1 = array[i];
        var lastNum2 = array[i + 1];
        base64Str += table[lastNum1 >>> 2]
            + table[((lastNum1 & 0b11) << 4) | (lastNum2 >>> 4)]
            + table[(lastNum2 & 0b1111) << 2]
            + '=';
    }
    return 'data:image/png;base64,'+base64Str;
}
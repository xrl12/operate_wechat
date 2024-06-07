"use strict";
import {app, BrowserWindow, ipcMain, globalShortcut} from "electron"
import {createFolderIfNotExist} from "./utils/index.js"
import * as fs from "fs"
import * as path from "path"
import {fileURLToPath} from 'url';
import Listen_ipc from "./listen_ipc.js"

let mainWindow;
// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前模块的目录路径
const __dirname = path.dirname(__filename);

const url = "http://localhost:3000"
const createWindow = () => {
    const win = new BrowserWindow({
        width: 200,
        height: 200,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js")
        },
    });
    win.loadURL(url) // Vite 开发服务器的地址
    // 注册全局快捷键，监听 Ctrl+Shift+I 键盘按键
    globalShortcut.register('CommandOrControl+Shift+I', () => {
        // 当快捷键被触发时，打开开发者工具
        mainWindow.webContents.openDevTools();
    });
    win.setTitle("自动操作微信")
    return win
}


app.whenReady().then(() => {
    mainWindow = createWindow();
    Listen_ipc(mainWindow)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            mainWindow = createWindow();
        }
    });
});

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {
        console.log('注销成功');
        globalShortcut.unregisterAll();
        app.quit();
    }
});



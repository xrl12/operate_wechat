import {ipcMain} from "electron";
import wechat_utils from "./utils/wechat/index.js";

export default (mainWindow) => {
    ipcMain.on('change-window-size', (_, option) => {
        if (mainWindow) {
            mainWindow.setSize(option.width, option.height);
        } else {
            console.error('没有找到窗口')
        }
    })
    ipcMain.handle('wechat-utils-method', async (_, options) => {
        const func = wechat_utils[options.method];
        if (func) {
            return func(options?.params)
        } else {
            throw new Error(`wechat-utils not has ${options.method} methods`)
        }
    })
    ipcMain.handle("bot-method", async (_, options) => {
        const method_or_attrs = options?.method_or_attr;
        const attrs = method_or_attrs.split(',');
        let val = wechat_utils.bot;
        let result = ''
        for (let attr of attrs) {
            val = val[attr] || {}
        }
        if (typeof val === 'function') {
            result = val(options.params)
        } else {
            if (JSON.stringify(val) === '{}') val = ''
            result = val
        }
        return val

    })
}
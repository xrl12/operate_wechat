const {ipcRenderer, contextBridge} = require('electron');
// const WechatUtils = require("./utils/wechat/index.js")


contextBridge.exposeInMainWorld('electron', {
    // 在这里暴露你需要在渲染进程中使用的API
    change_window_size: (data) => ipcRenderer.send('change-window-size', data),
    wechat_utils_method: (options) => ipcRenderer.invoke('wechat-utils-method', options),
    bot_method: (options) => ipcRenderer.invoke('bot-method', options)
});
// contextBridge.exposeInMainWorld("WechatUtils", WechatUtils)


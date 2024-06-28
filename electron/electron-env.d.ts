enum api {
    CHANGE_WINDOW_SIZE = "change_window_size",
    WECHAT_UTILS_METHOD = "wechat_utils_method",
    BOT_METHOD = "bot_method"
}

export interface IElectronAPI {
    [api.CHANGE_WINDOW_SIZE]: (options: { width: number, height: number }) => void
    [api.WECHAT_UTILS_METHOD]: (options: { method: string, params?: any }) => Promise<any>
    [api.BOT_METHOD]: (options: { method_or_attr: string, params?: any }) => Promise<any>
}


declare global {
    interface Window {
        electron: IElectronAPI;
    }
}

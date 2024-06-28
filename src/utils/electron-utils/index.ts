/**
 date: 2024/6/8
 user: xuruilong
 desc: 修改窗口视图大小
 @param options
 {
 width: number,  宽度
 height: number  高度
 }
 */
export const change_window_size = (options: { width?: number, height?: number } = {}): void => {
    const {width = 80, height = 80} = options;
    window.electron.change_window_size({width, height});
}

/**
 date: 2024/6/10
 user: xuruilong
 desc: 操作WeChatUtils里面的方法
 */
export const wechat_utils = async (option: { method: string, params?: any }): Promise<any> => {
    return await window.electron.wechat_utils_method(option);
}

/**
 date: 2024/6/10
 user: xuruilong
 desc:  操作bot里面的方法
 */
export const operate_bot_method = async (option: { method_or_attr: string, params?: any }): Promise<any> => {
    return await window.electron.bot_method(option)
}
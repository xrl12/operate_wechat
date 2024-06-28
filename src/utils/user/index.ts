import {operate_bot_method} from "../electron-utils";

/**
 date: 2024/6/29
 user: xuruilong
 desc: 查看用户是否登陆成功.
 现在没有很好的方法可以登陆成功直接通知客户端，所以这里会打开一个定时器会定时获取数据
 */
export const is_login_func = async (): Promise<boolean> => {
    return !!await operate_bot_method({method_or_attr: 'PROP,uin'})
}
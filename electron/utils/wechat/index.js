import Wechat from "wechat4u"
import * as fs from "fs"
import * as path from "path"
import * as os from "os"

const home_dir = os.homedir()

class WechatUtils {
    login_file
    bot


    constructor(login_file) {
        /**
         * enum is_login {
         *     pending: 未赋值
         *     login： 登陆成功
         *     logout: 退出
         * }
         */
        this.is_login_map = {
            pending: 'pending',
            login: 'login',
            logout: 'logout',
        }
        this.login_file = login_file; // 登陆的json文件
        this.is_login = this.is_login_map['pending'] // pending ｜ login | logout
        this.get_login_img_url = this.get_login_img_url.bind(this)
        this.valid_user_is_login = this.valid_user_is_login.bind(this)
        this.logout_wechat = this.logout_wechat.bind(this)
        this.login_wechat = this.login_wechat.bind(this)
        this.init().then(_ => {
            // console.log('hello world')
            // this.bot.restart()
            // this.login_wechat()
            // this.logout_wechat()
            // this.listen_bot_msg()
        })


    }

    async init() {
        let bot
        /**
         * 尝试获取本地登录数据，免扫码
         * 这里演示从本地文件中获取数据
         */
        try {
            const json_file = (await import(this.login_file, {with: {type: "json"}})).default
            bot = new Wechat(json_file)

        } catch (e) {
            this.is_login = this.is_login_map['logout']
            bot = new Wechat()
        }
        this.bot = bot

    }

    get_login_img_url() {
        let img_url
        return new Promise(resolve => {
            /**
             * uuid事件，参数为uuid，根据uuid生成二维码
             */
            this.bot.start()
            this.bot.on('uuid', (uuid) => {
                img_url = 'https://login.weixin.qq.com/qrcode/' + uuid
                resolve(img_url);
            })

        })
    }

    logout_wechat() {
        console.log('logout')
        this.bot.on('logout', () => {
            console.log('登出成功')
            this.is_login = this.is_login_map['logout']
            // 清除数据
            fs.unlinkSync(this.login_file)
        })
    }

    login_wechat() {
        /**
         * 监听wechat bot 登陆成功。
         * 如果登陆成功就把json文件保存在指定目录
         */
        console.log('login')
        this.bot.on('login', () => {
            // 保存数据，将数据序列化之后保存到任意位置
            console.log('使用历史记录登陆成功')
            // todo 现在没有好的方法可以查看到当前用户是否登陆，所以先不保存用户的登陆数据
            // fs.writeFileSync(this.login_file, JSON.stringify(this.bot.botData))
            this.is_login = this.is_login_map['login']
        })
    }

    valid_user_is_login() {
        /**
         * 用户用户是否登陆
         */
        
        while (this.is_login_map['pending'] === this.is_login) {
            /**
             * 循环，查看是否登陆成功
             */
        }
        return this.is_login_map['login'] === this.is_login
    }
}


const wechat_utils = new WechatUtils(path.join(home_dir, ".operate_wechat.json"))
export default wechat_utils


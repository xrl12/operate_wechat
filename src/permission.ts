import {RouteLocationNormalized, NavigationGuardNext} from "vue-router";
import router from "./router";
import {is_login_func} from "./utils/user";

const WHITE_LIST = ['/login']
router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) => {
    const is_login = await is_login_func();
    if (WHITE_LIST.includes(to.path)) {
        next()
    } else if (!is_login) {
        next({name: "login"})
    } else {
        next()
    }

})
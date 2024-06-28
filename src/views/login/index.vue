<template>
  <div class="login">
    <img :src="img_url" alt="" class="login_img">
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {change_window_size, wechat_utils} from "@/utils/electron-utils/index.ts";
import {is_login_func} from "@/utils/user/index.ts";

const router = useRouter();
let img_url = ref<string>("")
onMounted(() => {
  change_window_size({width: 200, height: 200})
  wechat_utils({method: "get_login_img_url"}).then((res: string) => {
    img_url.value = res
  })
  valid_user_is_login()
})

/**
 date: 2024/6/29
 user: xuruilong
 desc: 检查用户是否登陆，通过定时器来做轮训
 */
const valid_user_is_login = (): void => {
  let interval: NodeJS.Timeout, is_login;
  interval = setInterval(async () => {
    is_login = await is_login_func()
    if (is_login) {
      clearInterval(interval);
      await router.push({name: "dashboard"});
    }
  }, 1000)

}

</script>

<style scoped lang="scss">
.login {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  margin: 0 auto;

  & .login_img {
    width: 100%;
    height: 100%;
  }
}
</style>
<template>
  <div class="right_nav">
    <div class="head_img">
      <el-image :src="data.img_url" fit="fill" />
    </div>

    <div v-for="item in data.right_val_list" :key="item.id" :act="item.act">
      {{ item.value }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import snowflake from "@/utils/snowflake/index.ts";
import { wechat_utils } from "@/utils/electron-utils/index.ts";

const data = reactive<{
  right_val_list: Array<{ id: number; value: string; act: boolean }>;
  img_url: string;
}>({
  right_val_list: [
    { id: snowflake.nextId(), value: "消息", act: false },
    { id: snowflake.nextId(), value: "好友", act: true },
  ],
  img_url: "",
});

onMounted(() => {
  wechat_utils({
    method: "get_head_img",
    params: { max_time: 6 * 60 },
  }).then((res: string) => {
    data.img_url = res;
  });
});
</script>

<style scoped lang="scss">
$right-bg-color: #d5cfc5;
.right_nav {
  background-color: $right-bg-color;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 50px;

  & > .head_img {
    width: 40px;
  }

  & > div {
    margin-bottom: 20px;
    cursor: pointer;
  }

  div[act="true"] {
    color: green;
  }
}
</style>

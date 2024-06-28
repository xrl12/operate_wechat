<template>
  <div class="container">
    <right_nav class="right_nav"/>
    <search class="search"/>
    <friend_list class="friend_list"/>
    <router-view/>
  </div>

</template>

<script lang="ts" setup>
import right_nav from "@/components/layout/right_nav/index.vue";
import friend_list from "@/components/layout/friend_list/index.vue";
import search from "@/components/layout/search/index.vue";
import {change_window_size} from "@/utils/electron-utils/index.ts";
import {onMounted} from "vue";

onMounted(() => {
  change_window_size({width: 500, height: 500})
})
</script>


<style scoped lang="scss">
.container {
  display: grid;
  grid-template: "right_nav search" 50px
                  "right_nav friend_list"20fr/ 50px 1fr;
  width: 100%;
  height: 100%;
}

.friend_list {
  grid-area: friend_list;
}

.right_nav {
  grid-area: right_nav;
  grid-template-columns: 50px;
}

.search {
  grid-area: search;
}
</style>
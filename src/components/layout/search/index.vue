<template>
  <div class="search">
    <el-input placeholder="搜索" prefix-icon="search" v-model="data.search_val"></el-input>
    <el-button size="default"> +</el-button>
  </div>

</template>
<script setup lang="ts">
import {reactive} from "vue";

const data = reactive<{
  search_val: string
}>({
  search_val: "",
})
</script>


<style scoped lang="scss">
.search {
  display: flex;
  gap: 10px;
  padding: 10px 10px;

  //background: red;
  :deep(.el-button) {
    height: 30px;
  }

  :deep(.el-input) {
    height: 30px;
  }
}
</style>
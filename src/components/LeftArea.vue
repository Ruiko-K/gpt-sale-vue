<template>
  <el-menu default-active="1">
    <el-SubMenu index="1">
      <template #title>
        <span>私域文案</span>
      </template>
      <el-menu-item index="1" @click="switchMenu(1)">商品推广</el-menu-item>
      <el-menu-item index="2" @click="switchMenu(2)">活动推广</el-menu-item>
      <el-menu-item index="3" @click="switchMenu(3)">直播预告</el-menu-item>
    </el-SubMenu>
    <el-SubMenu index="4">
      <template #title>
        <span>社交平台文案</span>
      </template>
      <el-menu-item index="5">小红书</el-menu-item>
      <el-menu-item index="6">直播口播稿</el-menu-item>
    </el-SubMenu>
  </el-menu>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
  },
  setup(props, { emit }) {
    const switchMenu = (newValue) => {
      emit('updateIndex', newValue); // 触发自定义事件并传递新值给父组件
    };

    return {
      switchMenu
    };
  }
});
</script>

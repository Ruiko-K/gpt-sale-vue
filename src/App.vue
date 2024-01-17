<script>
import { ref } from 'vue'
import LeftArea from './components/LeftArea.vue';
import CenterArea from './components/CenterArea.vue';
import ProductPromotionForm from "./components/Form/ProductPromotionForm.vue";
import ActivityPromotionForm from "./components/Form/ActivityPromotionForm.vue";

export default {
  components: {
    LeftArea,
    CenterArea,
    ProductPromotionForm,
    ActivityPromotionForm
  },
  setup() {
    const menuIndex = ref(1);
    const updateIndex = (index) => {
      console.log(index);
      menuIndex.value = index;
      
    }
    return {
      menuIndex,
      updateIndex
    }
  }
}

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <LeftArea @updateIndex="updateIndex"/>
      </el-aside>
      <el-main>
        <CenterArea>
          <ProductPromotionForm v-if="menuIndex == '1'"></ProductPromotionForm>
          <ActivityPromotionForm v-if="menuIndex == '2'"></ActivityPromotionForm>
        </CenterArea>
      </el-main>
  </el-container>
</div></template>


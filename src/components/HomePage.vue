<script>
import { ref } from 'vue'
import LeftArea from './LeftArea.vue'
import CenterArea from './CenterArea.vue'
import RightArea from './RightArea.vue'
import ProductPromotionForm from './Form/ProductPromotionForm.vue'
import ActivityPromotionForm from './Form/ActivityPromotionForm.vue'
import LivePreviewForm from './Form/LivePreviewForm.vue'


export default {
  components: {
    LeftArea,
    CenterArea,
    RightArea,
    ProductPromotionForm,
    ActivityPromotionForm,
    LivePreviewForm
  },
  setup() {
    const menuIndex = ref(1);
    const updateIndex = (index) => {
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
    <el-container class="layout-container">
      <el-aside width="200px">
        <el-scrollbar>
          <LeftArea @updateIndex="updateIndex" />
        </el-scrollbar>
      </el-aside>
      <el-main>
        <el-row>
          <el-col :span="12">
            <CenterArea>
              <ProductPromotionForm v-if="menuIndex == '1'">
                <div class="title">商品推广</div>

              </ProductPromotionForm>
              <ActivityPromotionForm v-if="menuIndex == '2'">
                <div class="title">活动推广</div>
              </ActivityPromotionForm>
              <LivePreviewForm v-if="menuIndex == '3'">
                <div class="title">直播预告</div>
              </LivePreviewForm>
            </CenterArea>
          </el-col>
          <el-col :span="12">
            <RightArea></RightArea>
          </el-col>
        </el-row>


      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.title {
  font-size: 20px;
  font-weight: 400;
  padding: 10px;
  background-color: white;
}

.el-scrollbar {
  border-right: 1px solid #dcdfe6;
}
</style>

<template>
    <div id="right">
        <div class="title">生成文案</div>
        <article>{{ createText }}</article>
    </div>
</template>

<style scoped>
article {
    background-color: #fffcfc;
    /* 右侧的背景颜色 */
}
.title {
    font-size: 20px;
    font-weight: 400;
    padding: 10px;
}
#right {
    flex: 2;
    width: 90%;
    height: 100%;
    border: 1px solid #dcdfe6;
}
</style>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const createText = computed(() => store.state.createText);
</script>
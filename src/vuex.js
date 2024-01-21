import { createStore } from "vuex";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      // 你的状态
      createText:null
    };
  },
  mutations: {
    // 你的突变
    setCreateText(state, payload) {
      state.createText = payload;
    },
  },
  actions: {
    // 你的行动
  },
});

export default store;

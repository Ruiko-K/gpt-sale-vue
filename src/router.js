// router.js
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "./components/LoginPage.vue";
import HomePage from "./components/HomePage.vue";
import vueCookies from "vue-cookies";

const routes = [
  { path: "/", component: LoginPage },
  { path: "/login", component: LoginPage },

  { path: "/home", component: HomePage, meta: { requiresAuth: true } },
  // 其他路由配置
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // 检查路由是否需要登录验证
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let isLogin = isUserLoggedIn(); // 检查是否登录
    // 如果用户未登录，跳转到登录页面
    if (!isLogin) {
      next("/login"); // 跳转到登录页面
    } else {
      next(); // 继续路由导航
    }
  } else {
    next(); // 不需要登录验证的路由，继续导航
  }
});

// 替换 isUserLoggedIn 函数为你自己的登录验证逻辑
function isUserLoggedIn() {
  let isLogin = vueCookies.get("satoken") ? true : false;
  // // 在这里实现你的登录验证逻辑，根据实际情况返回 true 或 false
  if (isLogin) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/auth/isLogin", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true;

    const data = {};

    xhr.send(JSON.stringify(data));

    if (xhr.status === 200) {
      const res = JSON.parse(xhr.responseText);
      if (res.code == 200) {
        isLogin = true;
      } else {
        isLogin = false;
      }
    } else {
      console.error("token无效");
    }
  }
  return isLogin;
}

export default router;

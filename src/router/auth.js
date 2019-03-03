// 前端路由控制
import store from "store/index";

export const beforeEach = (to, from, next) => {
  if (!!store.state.hasLogin&& to.path == "/login-register") { // 已经登录用户
    next("/");
    return;
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.hasLogin) { // 未登录用户访问需要权限的组件
      next({
        path: "/login-register",
        query: {
          ft: 0,
        },
      });
      return;
    }
  }
  next();
};

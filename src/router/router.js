import Router from "vue-router";
import Vue from "vue";
import { beforeEach } from "./auth.js";

const FruitsList = () => import('views/product/List.vue');
const LoginRegister = () => import('views/login_register/LoginRegister.vue');
const Personal = () => import("views/personal/Personal.vue");
const MyCart = () => import("views/my_cart/MyCart.vue");
const Order = () => import("views/order/Order.vue");
const ProductionDetail = () => import("views/product_detail/ProductionDetail.vue")
const routerCfg = {
  routes: [
    {
      path: '/product',
      component: FruitsList,
      name: 'allProduction',
    },
    {
      path: '/login-register',
      component: LoginRegister,
      name: 'loginRegister',
    },
    {
      path: "/personal",
      component: Personal,
      name: "personal",
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/my-cart",
      name: "myCart",
      component: MyCart,
      meta: {
        requiresAuth: true,
      }
    }, {
      path: "/order",
      name: "order",
      component: Order,
      meta: {
        requiresAuth: true,
      }
    }, {
      path: '/production-detail',
      name: "prodDetail",
      component: ProductionDetail
    }
  ],
};
Vue.use(Router);
const router = new Router(routerCfg);
router.beforeEach(beforeEach);
export default router;
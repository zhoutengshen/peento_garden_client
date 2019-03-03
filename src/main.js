import Vue from "vue";
import ElementUi from "element-ui";
import "./plugins/element";
import router from "router/router";
import store from "store/index";
import aioxs from "axios";
import md5 from "js-md5";
import App from "./App.vue";
import "./assets/css/reset.css";
import "./assets/css/index.css";
import "./assets/css/tool.css";

Vue.prototype.$http = aioxs;
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false;
Vue.use(ElementUi, { size: "small", zIndex: 3000 });
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");

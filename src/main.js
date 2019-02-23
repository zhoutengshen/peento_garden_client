import Vue from 'vue';
import ElementUi from 'element-ui';
import './plugins/element';
import Router from 'vue-router';
import routerCfg from 'router/router';
import aioxs from 'axios';
import md5 from 'js-md5';
import App from './App.vue';
import './assets/css/reset.css';
import './assets/css/index.css';
import './assets/css/tool.css';

const router = new Router(routerCfg);
Vue.use(Router);
Vue.prototype.$http = aioxs;
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false;
Vue.use(ElementUi, { size: 'small', zIndex: 3000 });
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

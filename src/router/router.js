import Main from 'components/main/Main.vue';
import LoginRegister from 'components/submit_form/Index.vue';

export default {
  routes: [
    {
      path: '/product',
      component: Main,
      name: 'allProduction',
    },
    {
      path: '/login-register',
      component: LoginRegister,
      name: 'loginRegister',
    },
  ],
};

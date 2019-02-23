import Login from 'components/submit_form/Login.vue';
import Regster from 'components/register/Register.vue';
import Main from 'components/main/Main.vue';

export default {
  routes: [
    {
      path: '/',
      component: Main,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/reg',
      component: Regster,
    },
  ],
};

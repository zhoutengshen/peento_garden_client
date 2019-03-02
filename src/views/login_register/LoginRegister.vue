<template>
  <el-tabs :stretch="true" class="form fr" @tab-click="handleClick" v-model="activeName">
    <el-tab-pane name="login">
      <span slot="label">登录</span>
      <LoginForm/>
    </el-tab-pane>
    <el-tab-pane name="register">
      <span slot="label">注册</span>
      <RegisterForm/>
    </el-tab-pane>
  </el-tabs>
</template>
<style scoped>
.form {
  width: 400px;
  margin: 10px;
}
</style>

<script>
import LoginForm from 'components/forms/login/Login.vue';
import RegisterForm from 'components/forms/register/Register.vue';

export default {
  data() {
    return {
      activeName: 'login',
    };
  },
  components: {
    LoginForm,
    RegisterForm,
  },
  methods: {
    handleClick({ index }) {
      this.$router.push({
        name: 'loginRegister',
        query: {
          ft: index,
        },
      });
    },
  },
  mounted() {
    const type = this.$route.query.ft;
    this.activeName = type == 0 ? 'login' : 'register';
  },
  watch: {
    $route(to) {
      const type = to.query.ft;
      this.activeName = type == 0 ? 'login' : 'register';
    },
  },
};
</script>

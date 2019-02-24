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
import LoginForm from "./login/Login.vue";
import RegisterForm from "./register/Register.vue";

export default {
  data() {
    return {
      activeName: "login"
    };
  },
  components: {
    LoginForm,
    RegisterForm
  },
  methods: {
    handleClick({ index }) {
      this.$router.push({
        name: "loginRegister",
        query: {
          ft: index
        }
      });
    }
  },
  mounted() {
    let type = this.$route.query.ft;
    this.activeName = type == 0 ? "login" : "register";
  }
};
</script>

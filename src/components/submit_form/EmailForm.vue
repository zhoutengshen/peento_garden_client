<template>
  <el-form status-icon ref="form" :model="formData" :rules="rules">
    <el-form-item prop="email">
      <el-input v-model="formData.email" autocomplete="off" placeholder="输入邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="pass">
      <el-input v-model="formData.pass" autocomplete="off" type="password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item style="margin:0 15px">
      <el-checkbox v-model="formData.rememberMe">记住我</el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button @click="submitForm" type="primary" style="width:100%" size="middle">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    checkEmail: {
      type: Function,
      required: true,
    },
  },
  data() {
    const emailValidate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      }
      const reg = new RegExp(
        /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
      );
      const result = reg.test(value);
      if (result) {
        if (typeof this.checkEmail === 'function') {
          console.log(value);
          this.checkEmail({ account: value })
            .then((result) => {
              if (result.success) {
                callback();
              } else {
                callback(new Error(result.msg));
              }
            })
            .catch(() => {
              callback(new Error('远端验证失败'));
            });
        }
      } else {
        callback(new Error('请输入正确邮箱格式'));
      }
    };
    const passwordValidate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'));
      }
      callback();
    };
    return {
      byMobileCodeLogin: true,
      canFetchMobileCode: true,
      time: 60,
      formData: {
        email: '',
        pass: '',
        rememberMe: false,
      },
      rules: {
        email: [{ validator: emailValidate, trigger: 'blur' }],
        pass: [{ validator: passwordValidate, trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((isOk) => {
        if (isOk) {
          const account = this.formData.email;
          const password = this.formData.pass;
          const { rememberMe } = this.formData;
          this.$emit('getSonData', { account, password, rememberMe });
        }
      });
    },
  },
  created() {},
};
</script>

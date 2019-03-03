<template>
  <el-form status-icon ref="form" :model="formData" :rules="rules">
    <el-form-item prop="mobileNum">
      <el-input v-model="formData.mobileNum" autocomplete="off" placeholder="输入手机号码">
        <template slot="prepend">中国+86</template>
      </el-input>
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
    checkMobileNum: {
      type: Function,
      required: true,
    },
  },
  data() {
    const mobileNumValidate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      const reg = /^1[34578]\d{9}$/;
      if (reg.test(value)) {
        if (typeof this.checkMobileNum === "function") {
          this.checkMobileNum({ account: value })
            .then((result) => {
              if (result.success) {
                console.log(result.success);
                callback();
              } else {
                callback(new Error(result.msg));
              }
            })
            .catch(() => {
              callback(new Error("远端验证失败"));
            });
        }
      } else {
        callback(new Error("请输入正确手机号码"));
      }
    };
    const passwordValidate = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(new Error("密码不能为空"));
      }
    };
    return {
      byMobileCodeLogin: true,
      canFetchMobileCode: true,
      time: 60,
      formData: {
        mobileNum: "",
        pass: "",
        rememberMe: false,
      },
      rules: {
        mobileNum: [{ validator: mobileNumValidate, trigger: "blur" }],
        pass: [{ validator: passwordValidate, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((isOk) => {
        if (isOk) {
          const account = this.formData.mobileNum;
          const password = this.formData.pass;
          const { rememberMe } = this.formData;
          this.$emit("getSonData", { account, password, rememberMe });
        }
      });
    },
  },
  created() {},
};
</script>

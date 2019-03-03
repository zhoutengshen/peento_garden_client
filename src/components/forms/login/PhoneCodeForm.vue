<template>
  <el-form status-icon ref="form" :model="formData" :rules="rules">
    <el-form-item prop="mobileNum">
      <el-input v-model="formData.mobileNum" autocomplete="off" placeholder="输入手机号码">
        <template slot="prepend">中国+86</template>
      </el-input>
    </el-form-item>
    <el-form-item prop="mobileCode">
      <el-input v-model="formData.mobileCode" autocomplete="off" placeholder="请输入6位验证码">
        <template slot="append">
          <span
            :class="['fetch-code',!canFetchMobileCode?'fetch-code-disable':'']"
            @click="fetchMobileCode"
          >{{canFetchMobileCode?"获取验证码":getCodeMsg}}</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item style="margin:0 15px">
      <el-checkbox v-model="formData.rememberMe">记住我</el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button @click="submitForm" type="primary" style="width:100%" size="middle">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped>
.fetch-code {
  user-select: none;
  cursor: pointer;
}
.fetch-code-disable {
  color: #c0c4cc;
  cursor: not-allowed;
}
</style>

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
                this.canFetchMobileCode = true;
                this.getCodeMsg = "发送验证码";
                callback();
              } else {
                this.canFetchMobileCode = false;
                this.getCodeMsg = "请注册该手机号码";
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
    const mobileCodeValidate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码"));
      }
      const reg = /^\d{6}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入6位验证码"));
      }
    };
    return {
      canFetchMobileCode: false,
      getCodeMsg: "请输入手机号码",
      time: 60,
      formData: {
        mobileNum: "",
        mobileCode: "",
        rememberMe: false,
      },
      rules: {
        mobileNum: [{ validator: mobileNumValidate, trigger: "blur" }],
        mobileCode: [{ validator: mobileCodeValidate, trigger: "blur" }],
      },
    };
  },
  methods: {
    fetchMobileCode() {
      const that = this;
      if (this.canFetchMobileCode) {
        this.canFetchMobileCode = false;
        that.time = 60;
        const timerIndex = setInterval(() => {
          that.time -= 1;
          that.getCodeMsg = `${that.time} 秒后可从新发送`;
          if (that.time <= 0) {
            that.canFetchMobileCode = true;
            that.time = 60;
            clearInterval(timerIndex);
          }
        }, 1000);
        // TODO
        this.$http({
          url: `/api/mobilecode?mobileNum=${this.formData.mobileNum}`,
          method: "get",
        }).then(({ data }) => {
          const result = { ...data };
          console.log(result);
          if (result.success) {
            this.$notify({
              message: "发送成功",
              duration: 800,
            });
          } else {
            this.$notify({
              message: "发送失败",
              duration: 800,
            });
          }
        });
        console.log("fetching mobile code");
      }
    },
    submitForm() {
      this.$refs.form.validate((isOk) => {
        if (isOk) {
          const account = this.formData.mobileNum;
          const password = this.formData.mobileCode;
          const { rememberMe } = this.formData;
          this.$emit("getSonData", { account, password, rememberMe });
        }
      });
    },
  },
  created() {},
};
</script>

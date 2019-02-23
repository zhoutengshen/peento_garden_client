<template>
  <div class="reg-form fr">
    <el-form status-icon ref="form" :model="formData" :rules="rules">
      <el-form-item prop="mobileNum">
        <el-input v-model="formData.mobileNum" autocomplete="off" placeholder="输入手机号码">
          <template slot="prepend">中国+86</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input v-model="formData.pass" autocomplete="off" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="enPass">
        <el-input type="password" v-model="formData.enPass" autocomplete="off" placeholder="确认密码"></el-input>
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
      <el-form-item>
        <el-button @click="submitForm" type="primary" style="width:100%" size="middle">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
.reg-form {
  width: 400px;
  margin: 10px;
}
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
  data() {
    const mobileNumValidate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
      const reg = /^1[34578]\d{9}$/;
      if (reg.test(value)) {
        if (typeof this.checkMobileNum === 'function') {
          this.checkMobileNum({ account: value })
            .then((result) => {
              if (!result.success) {
                this.canFetchMobileCode = true;
                this.getCodeMsg = '发送验证码';
                callback();
              } else {
                this.canFetchMobileCode = false;
                this.getCodeMsg = '该手机号码已经注册';
                callback(new Error('该手机号码已经注册'));
              }
            })
            .catch(() => {
              callback(new Error('远端验证失败'));
            });
        }
      } else {
        callback(new Error('请输入正确手机号码'));
      }
    };
    const passwordValidate = (rule, value, callback) => {
      const reg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
      const reg1 = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
      let msg = "ok";
      if (reg.test(value)) {
        msg = "强：👍👍👍";
      } else if (reg1.test(value)) {
        msg = "中：👌👌";
      } else {
        msg = "弱：👌";
      }
      if (value) {
        callback(msg);
      } else {
        callback(new Error("密码不能为空"));
      }
    };
    const enPasswordValidate = (rule, value, callback) => {
      if (value) {
        if (this.formData.enPass == this.formData.pass) {
          callback();
        } else {
          callback(new Error("确保两次密码一致"));
        }
      } else {
        callback(new Error("密码不能为空"));
      }
    };
    return {
      canFetchMobileCode: false,
      getCodeMsg:'请输入手机号码',
      time: 60,
      formData: {
        mobileNum: "",
        pass: "",
        enPass: "",
        rememberMe: false,
        mobileCode: ""
      },
      rules: {
        mobileNum: [{ validator: mobileNumValidate, trigger: "blur" }],
        pass: [{ validator: passwordValidate, trigger: "blur" }],
        enPass: [{ validator: enPasswordValidate, trigger: "blur" }]
      }
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
          method: "get"
        }).then(({ data }) => {
          if (!data.success) {
            this.$notify({
              title: "",
              message: "发送成功",
              duration: 2000
            });
          } else {
            this.$notify({
              title: "",
              message: "发送失败",
              duration: 2000
            });
          }
        });
        console.log("fetching mobile code");
      }
    },
    submitForm() {
      this.$refs.form.validate(isOk => {
        if (isOk) {
          const account = this.formData.mobileNum;
          const password = this.formData.pass;
          const { rememberMe } = this.formData;
          this.$emit("getSonData", { account, password, rememberMe });
        }
      });
    },
    checkMobileNum() {
      const reqUrl = "/api/check/account";
      const account = this.formData.mobileNum;
      const accountType = 2;
      return new Promise((resolve, reject) => {
        this.$http({
          method: "GET",
          url: `${reqUrl}?account=${account}&accountType=${accountType}`
        })
          .then(resp => {
            resolve(resp.data);
          })
          .catch(reject);
      });
    }
  }
};
</script>

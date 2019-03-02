<template>
  <div>
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
        <el-button @click="submitForm" type="primary" style="width:100%" size="middle">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
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
      if (value.length <= 6) {
        return callback(new Error('密码必须多于6位字符'));
      }
      // const reg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
      // const reg1 = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
      // let msg = "ok";
      // if (reg.test(value)) {
      //   msg = "强：👍👍👍";
      // } else if (reg1.test(value)) {
      //   msg = "中：👌👌";
      // } else {
      //   msg = "弱：👌";
      // }
      if (value) {
        callback();
      } else {
        callback(new Error('密码不能为空'));
      }
    };
    const enPasswordValidate = (rule, value, callback) => {
      if (value) {
        if (this.formData.enPass == this.formData.pass) {
          callback();
        } else {
          callback(new Error('确保两次密码一致'));
        }
      } else {
        callback(new Error('密码不能为空'));
      }
    };
    const mobileCodeValidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error('验证码不能为空'));
      } else {
        const reg = /^\d{6}$/;
        if (!reg.test(value)) {
          callback(new Error('必须为6位数字'));
        } else {
          callback();
        }
      }
    };
    return {
      canFetchMobileCode: false,
      getCodeMsg: '请输入手机号码',
      time: 60,
      hasGetCode: false, // 是否已经发送过验证码
      formData: {
        mobileNum: '',
        pass: '',
        enPass: '',
        mobileCode: '',
      },
      rules: {
        mobileNum: [{ validator: mobileNumValidate, trigger: 'blur' }],
        pass: [{ validator: passwordValidate, trigger: 'blur' }],
        enPass: [{ validator: enPasswordValidate, trigger: 'blur' }],
        mobileCode: [{ validator: mobileCodeValidate, trigger: 'blur' }],
      },
    };
  },
  methods: {
    fetchMobileCode() {
      const that = this;
      if (this.canFetchMobileCode) {
        // 如果发送过验证码，允许提交表单
        that.hasGetCode = true;
        that.canFetchMobileCode = false;
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
        that
          .$http({
            url: `/api/mobilecode?mobileNum=${that.formData.mobileNum}`,
            method: 'get',
          })
          .then(({ data }) => {
            if (data.success) {
              that.$notify({
                title: '',
                message: '发送成功',
                duration: 2000,
              });
            } else {
              that.$notify({
                title: '',
                message: '发送失败',
                duration: 2000,
              });
            }
          });
        console.log('fetching mobile code');
      }
    },
    submitForm() {
      if (!this.hasGetCode) {
        this.$notify({
          message: '请先获取验证码',
          duration: 2000,
        });
        return;
      }
      this.$refs.form.validate((isOk) => {
        if (isOk) {
          const { pass } = this.formData;
          this.$http({
            url: '/api/register',
            method: 'POST',
            data: {
              ...this.formData,
              password: this.$md5(pass), // 加密
            },
          }).then(({ data }) => {
            if (data.success) {
              this.$router.push({ path: data.location }); // 跳转到登录页
            } else {
              this.$notify({
                message: data.msg,
                duration: 2000,
              });
            }
          });
        }
      });
    },
    checkMobileNum() {
      const reqUrl = '/api/check/account';
      const account = this.formData.mobileNum;
      const accountType = 2;
      return new Promise((resolve, reject) => {
        this.$http({
          method: 'GET',
          url: `${reqUrl}?account=${account}&accountType=${accountType}`,
        })
          .then((resp) => {
            resolve(resp.data);
          })
          .catch(reject);
      });
    },
  },
};
</script>

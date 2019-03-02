<template>
  <el-form
    ref="formData"
    :rules="rules"
    :model="formData"
    label-width="100px"
    label-position="left"
    id="info"
    class="info"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="formData.username" class="hover-underline-animation"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="formData.age" class="hover-underline-animation"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-select v-model="formData.gender" class="hover-underline-animation">
        <el-option value="-1" label="保密"></el-option>
        <el-option value="1" label="男"></el-option>
        <el-option value="0" label="女"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="手机号码" prop="mobile">
      <el-input v-model="formData.mobile" class="hover-underline-animation"></el-input>
      <i v-if="canFetchCode" style="cursor:pointer" @click="sendCode">{{timerMsg}}</i>
    </el-form-item>
    <el-form-item v-if="hasSendCode" label="验证码">
      <el-input placeholder="输入获取到的验证码"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="formData.email" class="hover-underline-animation"></el-input>
      <i style="cursor:pointer" @click="sendEmailCheck">{{emailCheckMsg}}</i>
    </el-form-item>
    <el-form-item label="真实姓名" prop="realname">
      <el-input v-model="formData.realname" class="hover-underline-animation"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">确认</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped>
.info {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 20px;
  padding-top: 100px;
}
.info > div {
  flex: 1;
}
</style>
<style>
#info .el-input {
  width: 500px;
}
#info input {
  border: 0;
  border-bottom: 2px solid #eee;
}
</style>
<script>
export default {
  props: {
    disabled: true
  },
  data() {
    return {
      canFetchCode: false,//是否可以从新获取验证码
      hasSendCode: false,//已经发送了验证码
      timerMsg: "获取验证码",
      timer: 60,//60秒后可以从新发送验证码
      hasSendEmailCheck: false,//是否发送了邮箱校验
      emailCheckMsg: "发送邮件校验",
      formData: {
        username: "牛逼",
        age: 0,
        gender: "保密",
        mobile: "13169141973",
        email: "1724847624@qq.com",
        realname: "zhoutengshen"
      },
      oddFormData: {
        username: "牛逼",
        age: 0,
        gender: "保密",
        mobile: "13169141973",
        email: "1724847624@qq.com",
        realname: "zhoutengshen"
      },
      rules: {
        username: {
          type: "string",
          required: true,
          min: 2,
          max: 10,
          message: "用户名不能为空,且必须在长度为2-10",
          trigger: "blur"
        },
        age: {
          type: "number",
          required: true,
          min: 0,
          max: 120,
          message: "年龄不能为空，且必须在0 - 100 之间",
          trigger: "blur"
        },
        mobile: {
          type: "string",
          required: true,
          validator: (rule, value, callback) => {
            this.canFetchCode = false;
            if (!value) {
              callback("手机号码不能为空");
              return;
            }
            let reg = /^1[34578]\d{9}$/;
            if (!reg.test(value)) {
              callback("手机号码格式错误");
              return;
            } else {
              if (this.formData.mobile == this.oddFormData.mobile) {
                callback();
                return;
              }
              this.checkMobileNum(2).then(data => {
                if (!data.success) {
                  //这个手机没有绑定其他账号
                  if (!this.hasSendCode) {
                    callback("修改手机号码请获取验证码");
                  } else {
                    callback();
                  }
                  this.canFetchCode = true;
                } else {
                  //该手机已经绑定了其他账号
                  callback("该手机已经绑定了其他账号");
                }
              });
            }
          }
        },
        email: {
          required: true,
          type: "email",
          trigger: "blur",
          validator: (rule, value, callback) => {
            if (!value) {
              callback("邮箱为空");
              return;
            }
            if (this.formData.email == this.oddFormData.email) {
              callback();
              return;
            }
            let reg = new RegExp(
              "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
            );
            if (!reg.test(value)) {
              callback("邮箱格式错误");
              return;
            } else {
              if (this.has) {
                return;
              }
              this.checkMobileNum(1).then(data => {
                if (!data.success) {
                  //这个邮箱没有绑定其他账号
                  if (!this.sendEmailCheck) {
                    callback("修改邮箱前校验邮箱");
                  } else {
                    callback();
                  }
                } else {
                  //该手机已经绑定了其他账号
                  callback("该邮箱已经绑定了其他账号");
                }
              });
            }
          }
        },
        realname: {
          required: true,
          message: "真实名字不能为空或者长度必须在2-10个字之间",
          trigger: "blur",
          min: 2,
          max: 10,
          type: "string"
        }
      }
    };
  },
  methods: {
    sendEmailCheck() {
      this.hasSendEmailCheck = true;
      this.$refs.formData.validateField("email");
      this.emailCheckMsg = "已发送邮件，请点击邮件链接确认";
      //发送校验
    },
    sendCode() {
      let that = this;
      if (!that.hasSendCode) {
        that.timerMsg = that.timer + "后获取验证码";
        that.hasSendCode = true;
        that.$refs.formData.validateField("mobile");
        let timerIndex = setInterval(() => {
          that.timerMsg = that.timer + "后获取验证码";
          if (that.timer <= 0) {
            that.hasSendCode = false;
            that.timer = 60;
            clearInterval(timerIndex);
            that.timerMsg = "获取验证码";
          }
          that.timer -= 1;
        }, 1000);
        //发送验证码；
      }
    },
    checkMobileNum(accountType) {
      const reqUrl = "/api/check/account";
      const account = this.formData.mobile;
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

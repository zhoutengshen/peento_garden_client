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
      <label v-if="!enableEdited.username" class="inof-lable">{{formData.username}}</label>
      <el-input
        v-if="enableEdited.username"
        v-model="formData.username"
        class="hover-underline-animation"
      ></el-input>
      <EditedBtn @edited="editedUserName"></EditedBtn>
    </el-form-item>

    <el-form-item label="年龄" prop="age">
      <label v-if="!enableEdited.age" class="inof-lable">{{formData.age}}</label>
      <el-input v-if="enableEdited.age" v-model="formData.age" class="hover-underline-animation"></el-input>
      <EditedBtn @edited="editedAge"></EditedBtn>
    </el-form-item>

    <el-form-item label="性别" prop="gender">
      <label
        v-if="!enableEdited.gender"
        class="inof-lable"
      >{{formData.gender==-1?"保密":(formData.gender==0?"女":"男")}}</label>
      <el-select
        v-if="enableEdited.gender"
        v-model="formData.gender"
        class="hover-underline-animation"
      >
        <el-option value="-1" label="保密"></el-option>
        <el-option value="1" label="男"></el-option>
        <el-option value="0" label="女"></el-option>
      </el-select>
      <EditedBtn @edited="editedGender"></EditedBtn>
    </el-form-item>

    <el-form-item label="手机号码" prop="mobile">
      <label v-if="!enableEdited.mobile" class="inof-lable">{{formData.mobile}}</label>
      <el-input
        v-if="enableEdited.mobile"
        v-model="formData.mobile"
        class="hover-underline-animation"
      ></el-input>
      <i v-if="canFetchCode" style="cursor:pointer" @click="sendCode">{{timerMsg}}</i>
      <EditedBtn @edited="editedMobile"></EditedBtn>
    </el-form-item>

    <el-form-item v-if="hasSendCode" label="验证码">
      <el-input placeholder="输入获取到的验证码"></el-input>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <label v-if="!enableEdited.email" class="inof-lable">{{formData.email}}</label>
      <el-input
        v-if="enableEdited.email"
        v-model="formData.email"
        class="hover-underline-animation"
      ></el-input>
      <i style="cursor:pointer" @click="sendEmailCheck">{{emailCheckMsg}}</i>
      <EditedBtn @edited="editedEmail"></EditedBtn>
    </el-form-item>

    <el-form-item label="真实姓名" prop="realname">
      <label v-if="!enableEdited.realname" class="inof-lable">{{formData.realname}}</label>
      <el-input
        v-if="enableEdited.realname"
        email
        v-model="formData.realname"
        class="hover-underline-animation"
      ></el-input>
      <EditedBtn @edited="editedRealname"></EditedBtn>
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
}
.info > div {
  flex: 1;
}
.inof-lable {
  font-size: 40px;
  font-weight: 600;
  text-shadow: 2px 4px 6px #666;
}
</style>
<style>
#info .el-input {
  width: 500px;
}
#info input {
  border: 0;
  border-bottom: 2px solid #eee;
  background: transparent;
}
</style>
<script>
import { updateUserInfo } from "api/api";
import EditedBtn from "./EditedBtn.vue";

export default {
  components: {
    EditedBtn,
  },
  data() {
    return {
      canFetchCode: false, // 是否可以从新获取验证码
      hasSendCode: false, // 已经发送了验证码
      timerMsg: "获取验证码",
      timer: 60, // 60秒后可以从新发送验证码
      hasSendEmailCheck: false, // 是否发送了邮箱校验
      emailCheckMsg: "发送邮件校验",
      formData: {},
      rules: {
        username: {
          type: "string",
          validator: (rule, value, callback) => {
            this.validateUserName(value).then((result) => {
              if (!result.pass) {
                callback(result.msg);
              } else {
                callback();
              }
            });
          },
          trigger: "blur",
        },
        age: {
          trigger: "blur",
          validator: (rule, value, callback) => {
            this.validateAge(value).then((result) => {
              if (!result.pass) {
                callback(result.msg);
              } else {
                callback();
              }
            });
          },
        },
        mobile: {
          type: "string",
          required: true,
          validator: (rule, value, callback) => {
            this.validateMobile(value).then((result) => {
              if (result.pass) {
                callback();
              } else {
                callback(result.msg);
              }
            });
          },
        },
        email: {
          required: true,
          type: "email",
          trigger: "blur",
          validator: (rule, value, callback) => {
            this.validateEmail(value).then((result) => {
              if (result.pass) {
                callback();
              } else {
                callback(result.msg);
              }
            });
          },
        },
        realname: {
          validator: (rule, value, callback) => {
            this.validataRealName(value).then((result) => {
              if (result.pass) {
                callback();
              } else {
                callback(result.msg);
              }
            });
          },
        },
      },
      enableEdited: {
        username: false,
        age: false,
        gender: false,
        mobile: false,
        email: false,
        realname: false,
      },
    };
  },
  methods: {
    editedUserName(val) {
      if (val == 0) {
        this.enableEdited.username = true;
      } else {
        this.enableEdited.username = false;
      }
      if (val == 1) {
        // 确认
        this.validateUserName(this.formData.username).then((result) => {
          if (result.pass) {
            updateUserInfo({
              values: {
                username: this.formData.username,
              },
            }).then(({ data }) => {
              if (data.success) {
                console.log("");
              } else {
                this.formData.username = this.user.username;
              }
            });
          }
        });
      } else if (val == 2) {
        // 取消
        this.formData.username = this.user.username;
      }
    },
    editedAge(val) {
      if (val == 0) {
        this.enableEdited.age = true;
      } else {
        this.enableEdited.age = false;
        if (val == 1) {
          // 确认
          updateUserInfo({
            values: {
              age: this.formData.age,
            },
          }).then(({ data }) => {
            if (!data.success) {
              this.formData.age = this.user.age;
            }
          });
        } else {
          // 取消
          this.formData.age = this.user.age;
        }
      }
    },
    editedGender(val) {
      if (val == 0) {
        this.enableEdited.gender = true;
      } else {
        this.enableEdited.gender = false;
        if (val == 1) {
          // 确认
          updateUserInfo({
            values: {
              gender: this.formData.gender,
            },
          }).then(({ data }) => {
            if (data.success) {
              console.log("");
            } else {
              this.formData.gender = this.user.gender;
            }
          });
        } else {
          // 取消
          this.formData.gender = this.user.gender;
        }
      }
    },
    editedEmail(val) {
      if (val == 0) {
        this.enableEdited.email = true;
      } else {
        this.enableEdited.email = false;
      }
      if (val == 1) {
        // 确认
        this.$notify({
          message: "当前版本暂时不支持修改邮箱",
        });
        this.formData.email = this.user.email;
      } else {
        // 取消
        this.formData.email = this.user.email;
      }
    },
    editedMobile(val) {
      if (val == 0) {
        this.enableEdited.mobile = true;
      } else {
        this.enableEdited.mobile = false;
      }
      if (val == 1) {
        // 确认
        // 确认
        this.$notify({
          message: "当前版本暂时不支持修改手机号码",
        });
        this.formData.mobile = this.user.mobile;
      } else {
        // 取消
        this.formData.mobile = this.user.mobile;
      }
    },
    editedRealname(val) {
      if (val == 0) {
        this.enableEdited.realname = true;
      } else {
        this.enableEdited.realname = false;
      }
      if (val == 1) {
        // 确认
        updateUserInfo({
          values: {
            realname: this.formData.realname,
          },
        }).then(({ data }) => {
          if (data.success) {
            console.log("");
          } else {
            this.formData.realname = this.user.realname;
          }
        });
      } else {
        // 取消
        this.formData.realname = this.user.realname;
      }
    },
    validateUserName(username) {
      return new Promise((resolve) => {
        if (!username) {
          resolve({ pass: false, msg: "用户名不能为空" });
          return;
        }
        if (username.length < 2 || username.length > 16) {
          resolve({ pass: false, msg: "用户名长度必须在2-16个字符之间" });
          return;
        }
        resolve({ pass: true });
      });
    },
    validateAge(val) {
      return new Promise((resolve) => {
        if (!val || !Number(val)) {
          resolve({ pass: false, msg: "输入必须为数字" });
          return;
        }
        const age = Number(val);
        if (age < 0 || age > 120) {
          resolve({ pass: false, msg: "年龄必须在0-120之间" });
          return;
        }
        resolve({ pass: true });
      });
    },
    validateMobile(value) {
      return new Promise((resolve) => {
        this.canFetchCode = false;
        if (!value) {
          resolve({ pass: false, msg: "手机号码不能为空" });
          return;
        }
        const reg = /^1[34578]\d{9}$/;
        if (!reg.test(value)) {
          resolve({ pass: false, msg: "手机号码格式错误" });
        } else {
          if (this.formData.mobile == this.user.mobile) {
            resolve({ pass: true });
            return;
          }
          this.checkMobileNum(2).then((data) => {
            if (!data.success) {
              // 这个手机没有绑定其他账号
              if (!this.hasSendCode) {
                resolve({ pass: false, msg: "修改手机号码请获取验证码" });
              } else {
                resolve({ pass: true });
              }
              this.canFetchCode = true;
            } else {
              // 该手机已经绑定了其他账号
              resolve({ pass: false, msg: "该手机已经绑定了其他账号" });
            }
          });
        }
      });
    },
    validateEmail(value) {
      return new Promise((resolve) => {
        if (!value) {
          resolve({ pass: false, msg: "邮箱为空" });
          return;
        }
        if (this.formData.email == this.user.email) {
          resolve({ pass: true });
          return;
        }
        const reg = new RegExp(
          "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$",
        );
        if (!reg.test(value)) {
          resolve({ pass: false, msg: "邮箱格式错误" });
          return;
        }
        if (this.has) {
          return;
        }
        this.checkMobileNum(1).then((data) => {
          if (!data.success) {
            // 这个邮箱没有绑定其他账号
            if (!this.sendEmailCheck) {
              resolve({ pass: false, msg: "修改邮箱前校验邮箱" });
            } else {
              resolve({ pass: true });
            }
          } else {
            // 该手机已经绑定了其他账号
            resolve({ pass: false, msg: "该邮箱已经绑定了其他账号" });
          }
        });
      });
    },
    validataRealName(val) {
      return new Promise((resolve) => {
        if (!val) {
          resolve({ pass: false, msg: "不能为空" });
          return;
        }
        if (val.length < 2 || val.length > 5) {
          resolve({ pass: false, msg: "真实姓名长度必须在2-5之间" });
        }
        resolve({ pass: true });
      });
    },
    sendEmailCheck() {
      this.hasSendEmailCheck = true;
      this.$refs.formData.validateField("email");
      this.emailCheckMsg = "已发送邮件，请点击邮件链接确认";
      // 发送校验
    },
    sendCode() {
      const that = this;
      if (!that.hasSendCode) {
        that.timerMsg = `${that.timer}后获取验证码`;
        that.hasSendCode = true;
        that.$refs.formData.validateField("mobile");
        const timerIndex = setInterval(() => {
          that.timerMsg = `${that.timer}后获取验证码`;
          if (that.timer <= 0) {
            that.hasSendCode = false;
            that.timer = 60;
            clearInterval(timerIndex);
            that.timerMsg = "获取验证码";
          }
          that.timer -= 1;
        }, 1000);
        // 发送验证码；
      }
    },
    checkMobileNum(accountType) {
      const reqUrl = "/api/check/account";
      const account = this.formData.mobile;
      return new Promise((resolve, reject) => {
        this.$http({
          method: "GET",
          url: `${reqUrl}?account=${account}&accountType=${accountType}`,
        })
          .then((resp) => {
            resolve(resp.data);
          })
          .catch(reject);
      });
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    this.formData = {
      ...this.$store.getters.user,
    };
  },
};
</script>

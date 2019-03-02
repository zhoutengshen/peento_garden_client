<template>
  <div>
    <PhoneCodeForm
      :check-mobile-num="checkMobileNum"
      @getSonData="submitForm"
      v-if="accountType==ACCNOUNT_TYPE.mobileCode"
    />
    <EmailForm
      :check-email="checkEmail"
      @getSonData="submitForm"
      v-if="accountType==ACCNOUNT_TYPE.email"
    />
    <PhoneNumForm
      :check-mobile-num="checkMobileNum"
      @getSonData="submitForm"
      v-if="accountType==ACCNOUNT_TYPE.mobileNum"
    />
    <el-row type="flex" justify="center">
      <el-col :class="accountType==ACCNOUNT_TYPE.mobileCode?'select':''">
        <span @click="changeAccountType(ACCNOUNT_TYPE.mobileCode)">手机验证码登录</span>
      </el-col>
      <el-col :class="accountType==ACCNOUNT_TYPE.email?'select':''">
        <span @click="changeAccountType(ACCNOUNT_TYPE.email)">电子邮箱登录</span>
      </el-col>
      <el-col :class="accountType==ACCNOUNT_TYPE.mobileNum?'select':''">
        <span @click="changeAccountType(ACCNOUNT_TYPE.mobileNum)">手机号码登录</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="clearfix">
        <router-link to="/reg" class="to-reg fr">去注册</router-link>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.el-col {
  text-align: center;
  cursor: pointer;
  color: #909399;
}
.el-col:hover {
  color: #c0c4cc;
}
.select {
  color: #409eff;
}
.to-reg {
  margin-top: 20px;
  font-size: 16px;
  text-align: right;
  color: #409eff;
}
</style>
<script>
import { LOGIN_ACTION } from 'store/actionType';
import PhoneCodeForm from './PhoneCodeForm.vue';
import EmailForm from './EmailForm.vue';
import PhoneNumForm from './PhoneNumForm.vue';

export default {
  components: {
    PhoneCodeForm,
    PhoneNumForm,
    EmailForm,
  },
  data() {
    return {
      accountType: 4,
      ACCNOUNT_TYPE: {
        username: 0,
        email: 1,
        mobileNum: 2,
        account: 3,
        mobileCode: 4,
      },
    };
  },
  methods: {
    changeAccountType(accountType) {
      this.accountType = accountType;
    },

    submitForm(obj) {
      let { password } = obj;
      // 密码登录  加密密码
      if (this.accountType != this.ACCNOUNT_TYPE.mobileCode) {
        console.log('加密密码....');
        password = this.$md5(password);
      }
      const data = {
        ...obj,
        password,
        accountType: this.accountType,
      };
      // TODO
      this.$store
        .dispatch(LOGIN_ACTION, data)
        .then(() => {
          this.$router.push({
            name: 'allProduction',
          });
        })
        .catch(() => {
          this.$notify({
            message: '登录失败',
            dulation: 2000,
          });
        });
    },
    checkMobileNum({ account }) {
      return this.check(this.accountType, account, '/api/check/account');
    },
    checkEmail({ account }) {
      return this.check(this.accountType, account, '/api/check/account');
    },
    check(accountType, account, reqUrl) {
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
  created() {},
};
</script>

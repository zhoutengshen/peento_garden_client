<template>
  <el-row type="flex" class="header-top clearfix">
    <el-col :offset="4" :span="16">
      <router-link exact class="fl title" to="/">蟠桃园</router-link>
      <router-link exact class="fl" :to="{name:'allProduction'}">全部商品</router-link>
      <router-link exact class="fl" :to="{name:'allProduction'}">首页</router-link>
      <router-link exact class="fl" :to="{name:'allProduction'}">尝鲜装</router-link>
      <div class="fr">
        <el-dropdown>
          <Avatar :src="user.avatarUrl" style="height:30px;width:30px"></Avatar>
          <el-dropdown-menu v-if="hasLogin" slot="dropdown">
            <el-dropdown-item @click.native="logoutHandle">退出登录</el-dropdown-item>
            <el-dropdown-item @click.native.stop="navToPersonal">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native.stop="navToMycart">我的购物车</el-dropdown-item>
            <el-dropdown-item @click.native.stop="navToOrder">订单信息</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu v-if="!hasLogin" slot="dropdown">
            <router-link :to="{name:'loginRegister',query:{ft:0}}">
              <el-dropdown-item>登录</el-dropdown-item>
            </router-link>
            <router-link :to="{name:'loginRegister',query:{ft:1}}">
              <el-dropdown-item>注册</el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="search fr">
        <el-input size="mini">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-col>
  </el-row>
</template>
<style scoped>
.header-top {
  position: fixed;
  box-sizing: border-box;
  top: 0;
  height: 50px;
  line-height: 50px;
  width: 100%;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
}
.header-top a {
  margin-right: 15px;
  color: #909399;
  font-size: 15px;
}
.header-top a + a {
  margin-left: 15px;
}
.search {
  margin-right: 10px;
}
.search > div {
  vertical-align: middle;
}
.title {
  font-size: 25px !important;
  color: #409eff !important;
}
a {
  text-decoration: none;
}
.router-link-active {
  color: #606266 !important;
}
a:hover {
  color: #175199;
}
.avatar {
  font-size: 25px;
}
</style>

<script>
import Avatar from "components/user/Avatar.vue";
import { LOGOUT_ACTION } from "store/actionType";

export default {
  components: {
    Avatar,
  },
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    navToOrder() {
      this.$router.push({
        name: "order",
      });
    },
    navToMycart() {
      this.$router.push({
        name: "myCart",
      });
    },
    navToPersonal() {
      this.$router.push({
        name: "personal",
      });
    },
    logoutHandle(e) {
      e.preventDefault();
      this.$store
        .dispatch(LOGOUT_ACTION)
        .then((resp) => {
          console.log(resp);
          if (resp.success) {
            this.$notify({
              message: resp.message,
              duration: 800,
            });
            this.$router.push({
              path: resp.location,
            });
          } else {
            this.$notify({
              message: resp.message,
              duration: 800,
            });
          }
        })
        .catch((e) => {
          console.log("注销时发生意外");
          console.log(e);
        });
    },
  },
  computed: {
    user() {
      const avatarUrl = require("assets/img/defaultAvatar.png");
      let { user } = this.$store.getters;
      if (!user.avatarUrl) {
        user = {
          ...user,
          avatarUrl,
        };
      }
      return user;
    },
    hasLogin() {
      return this.$store.state.hasLogin;
    },
  },
};
</script>

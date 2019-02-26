<template>
  <el-row type="flex" class="header-top clearfix">
    <el-col :offset="4" :span="16">
      <router-link exact class="fl title" to="/">蟠桃园</router-link>
      <router-link exact class="fl" :to="{name:'allProduction'}">全部商品</router-link>
      <router-link exact class="fl" :to="{name:'allProduction'}">首页</router-link>
      <router-link exact class="fl" :to="{name:'allProduction'}">尝鲜装</router-link>
      <router-link exact class="fr" :to="{name:'loginRegister',query:{ft:0}}">[登录Or请注]</router-link>
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
.search>div{
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
</style>

<script>
export default {
  components: {},
  data() {
    return {
      isActive: true
    };
  }
};
</script>

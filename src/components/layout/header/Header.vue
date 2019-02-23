<template>
  <el-row type="flex" class="header-top">
    <el-col :offset="4" :span="4">
      <div>
        <router-link to="/">您好，欢迎光临蟠桃园</router-link>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="clearfix">
        <router-link to="/login" class="fr">[请登录]</router-link>
        <router-link to="/reg" class="fr">[新朋友注册]</router-link>
      </div>
    </el-col>
  </el-row>
</template>
<style scoped>
.header-top {
  color:#909399;
  padding: 8px 0;
  background-color: #eee;
  border-bottom: 1px solid #dcdfe6;
}
</style>
<script>
export default {
  components: {},
  data() {
    return {

    };
  },
};
</script>

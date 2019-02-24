<template>
  <el-row type="flex" class="content">
    <el-col :offset="4" :span="16">
      <slot></slot>
    </el-col>
  </el-row>
</template>
<style scoped>
.content{
    margin:15px;
    background-color: #fff;
    border-radius: 10px;
    height: 100%;
}
</style>
<script>
export default {};
</script>

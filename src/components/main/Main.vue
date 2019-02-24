<template>
  <el-row>
    <el-col :span="24">
      <FruitItem></FruitItem>
    </el-col>
  </el-row>
</template>
<style scoped>
</style>
<script>
import FruitItem from 'components/product/Item';

export default {
  components:{
    FruitItem,
  }
};
</script>

<template>
  <el-row>
    <el-col :span="24">
      <FruitList>
      </FruitList>
    </el-col>
  </el-row>
</template>
<style scoped>
</style>
<script>
import FruitList from 'components/product/List.vue';

export default {
  components:{
    FruitList,
  }
};
</script>

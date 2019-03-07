<template>
  <span class="btn">
    <el-button @click="edited(0)" v-if="canEditd" size="mini" type="success" icon="el-icon-edit" circle></el-button>
    <el-button
      @click="edited(1)"
      v-if="!canEditd"
      size="mini"
      type="success"
      icon="el-icon-check"
      circle
    ></el-button>
    <el-button @click="edited(2)" v-if="!canEditd" size="mini" type="success" icon="el-icon-close" circle></el-button>
  </span>
</template>
<style scoped>
.btn {
  display: inline-block;
  margin: 5px;
}
</style>
<script>
export default {
  data() {
    return {
      canEditd: true,
    };
  },
  methods: {
    edited(val) {
      if (val == 0) {
        this.canEditd = false;
      } else {
        this.canEditd = true;
      }
      this.$emit("edited", val);
    },
  },
};
</script>

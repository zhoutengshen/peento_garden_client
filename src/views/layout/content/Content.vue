<template>
  <div class="content">
    <div class="main clearfix">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.content {
  margin: 15px;
  margin-top: 65px;
  border-radius: 10px;
   min-height: 100%;
}
.main {
  margin: 0 auto;
  width: 1300px;
  background-color: #fff;
   min-height: 100%;
}
</style>
<script>
export default {};
</script>

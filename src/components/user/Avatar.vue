<template>
  <div class="avatar">
    <img :style="avatarStyle" :src="src">
  </div>
</template>
<style scoped>
.avatar {
  margin: 5px;
  width: 100%;
  height: 100%;
}
.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
<script>

export default {
  props: {
    avatarStyle: {
      type: Object,
      required: false,
    },
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

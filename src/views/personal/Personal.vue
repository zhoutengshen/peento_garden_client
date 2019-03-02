<template>
  <el-card body-style="padding:0">
    <header class="header" @mouseleave="showCarousel=false">
      <span @mouseenter="showCarousel=true">更换封面</span>
      <transition name="fade">
        <el-carousel v-if="showCarousel" height="240px" :interval="5000" arrow="always">
          <el-carousel-item v-for="({src,id}) in bgImgs" :key="id">
            <img style="width:100%" :src="src">
          </el-carousel-item>
        </el-carousel>
      </transition>
    </header>
    <div class="main">
      <div class="big-avatar">
        <img
          src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3377302992,3361149372&fm=27&gp=0.jpg"
        >
      </div>
      <div class="container">
        <p class="name">
          {{username}}
          <i class="el-icon-edit" style="font-size:16px;cursor:pointer"></i>
        </p>
        <EditedForm  ref="form"></EditedForm>
      </div>
    </div>
  </el-card>
</template>
<script>
import EditedForm from "views/personal/EditedForm.vue";

export default {
  components: {
    EditedForm,
  },
  data() {
    return {
      showCarousel: false,
      username: ""
    };
  },
  methods: {},
  computed: {
    bgImgs() {
      let imgs = [
        {
          id: "img1",
          src:
            "https://static.zhihu.com/heifetz/assets/guide-cover-3.d59ac68c.jpg"
        },
        {
          id: "igm2",
          src:
            "https://static.zhihu.com/heifetz/assets/guide-cover-4.5518ba1a.jpg"
        },
        {
          id: "img3",
          src:
            "https://static.zhihu.com/heifetz/assets/guide-cover-5.2b2adaeb.jpg"
        }
      ];
      return imgs;
    }
  },
  mounted() {
    this.username = this.$refs["form"].formData.username;
  }
};
</script>
<style scoped>
.header {
  position: relative;
  height: 240px;
  background: #f6f6f6;
}
.main {
  position: relative;
  height: 760px;
}
.big-avatar {
  position: absolute;
  box-sizing: border-box;
  border-radius: 15px;
  width: 150px;
  height: 150px;
  left: 50px;
  top: -50px;
  cursor: pointer;
  border: 5px solid #fff;
  background: #000;
  z-index: 998;
}
.big-avatar > img {
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
.container {
  box-sizing: border-box;
  padding-left: 200px;
  width: 100%;
  height: 100%;
}
.header > span {
  position: absolute;
  display: inline-block;
  right: 20px;
  top: 20px;
  box-sizing: border-box;
  text-align: center;
  width: 150px;
  line-height: 30px;
  border-radius: 5px;
  font-weight: 400;
  color: #909090;
  cursor: pointer;
  user-select: none;
  border: 2px solid #eee;
  background: transparent;
  z-index: 998;
}
.name {
  position: absolute;
  top: 0px;
  height: 40px;
  padding: 30px;
  font-size: 30px;
  font-weight: 600;
  text-shadow: 0 2px white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

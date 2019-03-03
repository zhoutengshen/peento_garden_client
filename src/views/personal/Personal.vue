<template>
  <el-card body-style="padding:0">
    <header class="header" @mouseleave="showCarousel=false">
      <span @mouseenter="showCarousel=true">更换封面</span>
      <transition name="fade">
        <el-carousel
          v-if="showCarousel&&!user.bgImgUrl"
          height="240px"
          :interval="5000"
          arrow="always"
        >
          <el-carousel-item v-for="({src,id}) in bgImgs" :key="id">
            <img style="width:100%" :src="src">
          </el-carousel-item>
        </el-carousel>
      </transition>
      <div v-if="user.bgImgUrl" class="bg-img">
        <img :src="user.bgImgUrl">
      </div>
    </header>
    <div class="main">
      <div type="file" class="big-avatar" @click="uploadAvatar">
        <img :src="user.avatarUrl">
        <i class="el-icon-upload"></i>
        <input
          accept="image/x-png, image/gif, image/jpeg, image/bmp"
          type="file"
          @change="uploadAvatarHandle"
          ref="uploadAvatar"
          class="upload-avatar-input"
        >
      </div>
      <div class="container">
        <p class="name">
          {{user.username}}
          <i class="el-icon-edit" style="font-size:16px;cursor:pointer"></i>
        </p>
        <EditedForm ref="form"></EditedForm>
      </div>
    </div>
  </el-card>
</template>
<script>
import EditedForm from "views/personal/EditedForm.vue";
import { fetchUserInfo } from "api/api";
import { SET_USER_MUTATION } from "store/mutationType";

export default {
  components: {
    EditedForm
  },
  data() {
    return {
      showCarousel: false,
      tempAvatar: ""
    };
  },
  methods: {
    uploadAvatar() {
      this.$refs["uploadAvatar"].click();
    },
    uploadAvatarHandle() {
      let input = this.$refs["uploadAvatar"];
      let file = input.files[0];
      if (!!file) {
        let formData = new FormData();
        formData.append("img", file);
        this.$http({
          url: "/api/upload/img",
          data: formData,
          method: "POST"
        })
          .then(({ data }) => {
            if (data.success) {
              let avatarUrl = data.avatarUrl;
              console.log(data);
              let oldUser = this.$store.state.user;
              this.$store.commit(SET_USER_MUTATION,{
                ...oldUser,
                avatarUrl,
              })
            }
          })
          .catch(() => {
            input.files[0] = null;
          });
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    bgImgs() {
      const imgs = [
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
    },
    bigAvatar() {
      if (this.$store.getters.user && this.$store.getters.user.avatarUrl) {
        return this.$store.getters.user.avatarUrl;
      }
      const avatarUrl = require("assets/img/defaultAvatar.png");
      return avatarUrl;
    }
  },
  mounted() {
    fetchUserInfo()
      .then(({ data }) => {
        if (data.success) {
          const { user, msg } = data;
          const gender =
            user.gender == -1 ? "保密" : user.gender == 1 ? "男" : "女";
          this.$refs.form.formData = {
            ...user,
            gender
          };
        } else {
          this.$notify({
            message: msg
          });
        }
      })
      .catch(e => {
        console.log(e);
        this.$notify({
          message: "获取用户数据出错"
        });
      });
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
  left: 50px;
  top: -50px;
  width: 150px;
  height: 150px;
  border-radius: 15px;
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
.big-avatar > i {
  position: absolute;
  font-size: 2em;
  opacity: 0.5;
  right: 5px;
  top: 5px;
}
.upload-avatar-input {
  display: none;
}
.bg-img {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.bg-img img {
  width: 100%;
  height: 100%;
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
  font-size: 40px;
  font-weight: 600;
  text-shadow: 2px 4px 6px #666;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

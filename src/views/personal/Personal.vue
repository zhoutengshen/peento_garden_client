<template>
  <el-card body-style="padding:0">
    <header class="header" @mouseleave="showCarousel=false">
      <input
        accept="image/x-png, image/gif, image/jpeg, image/bmp"
        type="file"
        @change="uploadImgHandel('uploadGbImg')"
        ref="uploadGbImg"
        class="upload-input"
      >
      <span @mouseenter="showCarousel=true" @click="uploadClickHandel('uploadGbImg')">更换封面</span>
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
      <div type="file" class="big-avatar" @click="uploadClickHandel('uploadAvatar')">
        <img :src="user.avatarUrl">
        <i class="el-icon-upload"></i>
        <input
          accept="image/x-png, image/gif, image/jpeg, image/bmp"
          type="file"
          @change="uploadImgHandel('uploadAvatar')"
          ref="uploadAvatar"
          class="upload-input"
        >
      </div>
      <div class="container">
        <p class="name">
          {{user.username}}
          <i class="el-icon-edit" style="font-size:16px;cursor:pointer"></i>
        </p>
        <el-tabs class="tab" :stretch="true" v-model="activeTabName">
          <el-tab-pane label="修改个人信息" name="tabInfo">
            <EditedUserInfoForm></EditedUserInfoForm>
          </el-tab-pane>
          <el-tab-pane label="修改收货地址" name="tabAdress">
            <EditedUserAdressForm></EditedUserAdressForm>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-card>
</template>
<script>
import EditedUserInfoForm from "views/personal/EditedUserInfoForm.vue";
import EditedUserAdressForm from "views/personal/EditedUserAdressForm.vue";
import { fetchUserInfo, updateUserInfo, uploadImg } from "api/api";
import { SET_USER_MUTATION } from "store/mutationType";

export default {
  components: {
    EditedUserInfoForm,
    EditedUserAdressForm
  },
  data() {
    return {
      showCarousel: false,
      userId: "",
      enSureUpdateAvata: true,
      bgImgUrl: "",
      activeTabName: "tabInfo"
    };
  },
  methods: {
    uploadClickHandel(inputName) {
      this.$refs[inputName].click();
    },
    uploadImgHandel(inputName) {
      const input = this.$refs[inputName];
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("img", file);
        uploadImg(formData)
          .then(({ data }) => {
            if (data.success) {
              const { url } = data;
              const oldUser = this.$store.state.user;
              const values = {
                // 需要修改的数据的字段，值
              };
              if (inputName == "uploadGbImg") {
                // 上传背景图片
                values.bg_img_url = url;
                this.$store.commit(SET_USER_MUTATION, {
                  ...oldUser,
                  bgImgUrl: url
                });
              } else {
                // 上传头像
                values.avatar_url = url;
                this.$store.commit(SET_USER_MUTATION, {
                  ...oldUser,
                  avatarUrl: url
                });
              }
              updateUserInfo({
                id: this.userId,
                values
              });
            }
          })
          .catch(e => {
            console.log(e);
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
        const { user, msg } = data;
        if (data.success) {
          this.userId = user.id;
          this.$store.commit(SET_USER_MUTATION, {
            ...user
          });
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
.upload-input {
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
  padding: 0 100px 0 200px;
  width: 100%;
  height: 100%;
}
.tab {
  padding-top: 100px;
  width: 100%;
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

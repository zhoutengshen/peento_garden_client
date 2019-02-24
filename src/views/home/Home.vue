<template>
  <div class="home">
    <Header></Header>
    <Content>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </Content>
    <Footer></Footer>
  </div>
</template>
<style scoped>
@import url("./style.css");
</style>
<script>
import Header from 'components/layout/header/Header.vue';
import Content from 'components/layout/content/Content.vue';
import Footer from 'components/layout/footer/Footer.vue';

export default {
  components: {
    Header,
    Content,
    Footer,
  },
  watch: {
  },
};
</script>

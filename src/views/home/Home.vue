<template>
  <div class="home">
    <Header></Header>
    <Content>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </Content>
    <Footer></Footer>
    <FloatBasket></FloatBasket>
  </div>
</template>
<style scoped>
@import url("./style.css");
</style>
<script>
import Header from 'components/layout/header/Header.vue';
import Content from 'components/layout/content/Content.vue';
import Footer from 'components/layout/footer/Footer.vue';
import FloatBasket from 'components/float_basket/FloatBasket.vue';

export default {
  components: {
    Header,
    Content,
    Footer,
    FloatBasket,
  },
  watch: {
  },
};
</script>

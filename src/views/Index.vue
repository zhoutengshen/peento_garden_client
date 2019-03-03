<template>
  <div class="home">
    <Header></Header>
    <Content>
      <router-view></router-view>
    </Content>
    <Footer></Footer>
    <FloatBasket></FloatBasket>
  </div>
</template>
<style scoped>
@import url("./style.css");
</style>
<script>
import Header from "views/layout/header/Header.vue";
import Content from "views/layout/content/Content.vue";
import Footer from "views/layout/footer/Footer.vue";
import FloatBasket from "components/float_basket/FloatBasket.vue";

export default {
  components: {
    Header,
    Content,
    Footer,
    FloatBasket,
  },
  watch: {},
};
</script>

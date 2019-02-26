<template>
  <div class="fruit-list">
    <FruitItem class="fruit-item" v-for="fruit in fruits" :key="fruit.id" :fruit="fruit"></FruitItem>
  </div>
</template>
<style scoped>
.fruit-list{
    margin: 0 auto;
    padding: 0 30px;
}
.fruit-item{
    display: inline-block;
    width:300px;
    margin:10px 5px;
}

</style>

<script>
import mockData from "mock/fruits.json";
import FruitItem from "./Item.vue";

export default {
  components: {
      FruitItem,
  },
  data() {
    return {
      fruits: []
    };
  },
  methods: {
    getFruitData() {
      this.fruits = mockData;
    }
  },
  mounted() {
    this.getFruitData();
  }
};
</script>


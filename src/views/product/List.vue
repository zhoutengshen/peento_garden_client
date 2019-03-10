<template>
  <div class="fruit-list">
    <FruitItem class="fruit-item" v-for="fruit in allFruits" :key="fruit.id" :fruit="fruit"></FruitItem>
  </div>
</template>
<style scoped>
.fruit-list {
  margin: 0 auto;
  padding: 0 30px;
}
.fruit-item {
  display: inline-block;
  width: 300px;
  margin: 10px 5px;
}
</style>

<script>
import { FETCH_ALL_PRODUCTIONS_ACTION } from "store/actionType";
import FruitItem from "./Item.vue";

export default {
  components: {
    FruitItem,
  },
  data() {
    return {
      total: "",
    };
  },
  methods: {},
  mounted() {
    this.$store.dispatch(FETCH_ALL_PRODUCTIONS_ACTION, {
      limit: 100,
      offset: 0,
    });
  },
  computed: {
    allFruits() {
      return this.$store.state.allFruits;
    },
  },
};
</script>

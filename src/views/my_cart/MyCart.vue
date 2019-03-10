<template>
  <div class="main">
    <el-row>
      <el-col>
        <el-checkbox @change="selectAllHandle">选择全部</el-checkbox>
      </el-col>
    </el-row>
    <CartItem
      @remove="remove($event)"
      style="display:inline-block"
      v-for="cart in cartItems"
      :cart="cart"
      :key="cart.fruitId"
      @updateFatherTotal="getSonTotal"
    ></CartItem>
    <el-row style="padding:10px" type="flex">
      <el-col :offset="18">
        <el-button type="primary">合计：{{fatherTotal}}元</el-button>
        <el-button type="success" @click="goToOrder">去结算</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.main {
  padding: 20px;
}
</style>

<script>
import { CLEAR_CART_ITEM_MUTATION } from "store/mutationType";
import { fetchMyCartInfo } from "api/api";
import humps from "humps";
import CartItem from "./CartItem.vue";

export default {
  components: {
    CartItem
  },
  data() {
    return {
      cartItems: [],
      fatherTotal: 0
    };
  },
  methods: {
    remove(id) {
      this.cartItems = this.cartItems.filter(item => item.id != id);
    },
    getSonTotal(val) {
      this.fatherTotal += val;
    },
    selectAllHandle(val) {
      const newCartItems = [];
      this.cartItems.forEach(item => {
        newCartItems.push({
          ...item,
          select: val
        });
      });
      this.cartItems = newCartItems;
    },
    goToOrder() {
      this.$router.push({
        name: "postOrder"
      });
      console.log(this.$store.state.user);
    }
  },
  mounted() {
    this.$store.commit(CLEAR_CART_ITEM_MUTATION);
    fetchMyCartInfo().then(({ data }) => {
      let { carts } = data;
      carts = humps.camelizeKeys(carts);
      this.cartItems = carts.map(item => ({
        ...item,
        select: !!item.select
      }));
    });
  }
};
</script>

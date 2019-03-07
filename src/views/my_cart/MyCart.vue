<template>
  <div>
      <CartItem @remove="remove($event)" style="display:inline-block" v-for="cart in cartItems" :cart="cart" :key="cart.fruitTitle">
      </CartItem>
  </div>
</template>
<style scoped>
</style>

<script>
import { CLEAR_CART_ITEM_MUTATION } from "store/mutationType";
import { fetchMyCartInfo } from "api/api";
import humps from "humps";
import CartItem from "./CartItem.vue";

export default {
  components: {
    CartItem,
  },
  data() {
    return {
      cartItems: [],
    };
  },
  methods:{
    remove(id){
      this.cartItems = this.cartItems.filter(item=>item.id != id);
    }
  },
  mounted() {
    this.$store.commit(CLEAR_CART_ITEM_MUTATION);
    fetchMyCartInfo().then(({ data }) => {
      let carts = data.carts;
      carts = humps.camelizeKeys(carts);
      this.cartItems.push(...carts);
    });
    
  },
};
</script>

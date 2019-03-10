<template>
  <div class="main" :style="{top:positionY + 'px',left:positionX + 'px'}">
    <span
      @click="navToMyCart"
      title="去购物车页"
      class="badge"
      style="left:37px;background:#000;opacity:.5;z-index:1000;top:-20px"
    >查</span>
    <i @mousedown="move()" class="cart-size iconfont icon-float-basket">
      <span
        @mouseleave="showDiscFruits=false"
        @mouseenter="showDiscFruits=true"
        class="badge"
      >{{count}}</span>
    </i>
    <ul
      @mouseleave="showDiscFruits=false"
      @mouseenter="showDiscFruits=true"
      :class="['disc-fruit',showDiscFruits&&count&&'disc-fruit-show'] "
    >
      <li @click="navToProdDetail" v-for="cartItem of cartItems" :key="cartItem.id">
        <span class="count">{{cartItem.num}}</span>
        <span class="title" :title="cartItem.fruitTitle">{{cartItem.fruitTitle}}</span>
        <span class="reduce-increase">
          <i @click="reduce(cartItem.id)" class="iconfont icon-down"></i>
          <i @click="increase(cartItem.id)" class="iconfont icon-up"></i>
        </span>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.main {
  position: fixed;
  top: 10px;
  right: 10px;
  cursor: move;
  z-index: 1000;
  width: 80px;
  height: 80px;
}
.cart-size {
  position: relative;
  font-size: 80px;
  padding: 20px;
  color: red;
}
.badge {
  display: inline-block;
  position: absolute;
  top: 0px;
  right: -10px;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  background: #e6a23c;
  font-size: 16px;
  line-height: 30px;
  color: #fff;
  cursor: pointer;
}
.badge1 {
  position: absolute;
  font-size: 20px;
  top: 0;
  text-align: center;
  border-radius: 15px;
  line-height: 30px;
  width: 30px;
  background: #ffff;
  height: 30px;
  display: inline-block;
  left: 39px;
}
.disc-fruit:hover {
  cursor: pointer;
}
.disc-fruit-show {
  display: inline-block;
}
.disc-item .count {
  color: #fff;
}
.disc-item .title {
  color: #fff;
}
ul {
  display: none;
  position: absolute;
  box-sizing: border-box;
  padding: 10px;
  top: -15px;
  left: 100px;
  width: 300px;
  border-radius: 5px;
  background: #000;
  z-index: -1;
  opacity: 0.5;
}
ul > li {
  line-height: 20px;
  color: #fff;
  margin: 5px;
  user-select: none;
}
ul > li .count {
  display: inline-block;
  width: 20px;
  text-align: center;
  background: red;
  border-radius: 50%;
}
ul > li .title {
  display: inline-block;
  width: 200px;
  margin-left: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: middle;
}
ul > li .title:hover {
  color: #409eff;
}
ul > li .reduce-increase {
  display: inline-block;
  width: 40px;
  font-size: 20px;
  color: #67c23a;
}
ul > li i:hover {
  color: red;
}
</style>
<script>
import {
  ADD_CART_ITEM_MUTATION,
  DEL_CART_ITEM_MUTATION,
} from "store/mutationType";
import lodash from "lodash";
import { updateCart } from "api/api";

export default {
  data() {
    return {
      showDiscFruits: false,
    };
  },
  methods: {
    navToProdDetail() {
      // this.$router.push({
      //   name: "/prodDetail",
      // });
      // this.showDiscFruits = false;
    },
    navToMyCart() {
      // this.$router.push({
      //   name: "myCart",
      // });
    },
    increase(id) {
      this.$store.commit(ADD_CART_ITEM_MUTATION, id);
      if (this.$store.state.hasLogin) {
        // 登录用户
        updateCart({ id, num: 1 });
      }
    },
    reduce(id) {
      this.$store.commit(DEL_CART_ITEM_MUTATION, id);
      if (this.$store.state.hasLogin) {
        // 登录用户
        const cart = this.$store.allFruits.find(item => item.id);
        if (cart) {
          addCarts([{ ...cart, num: 1 }]);
        }
      }
    },
    move() {
      document.onmousemove = (e) => {
        // 鼠标按下并移动的事件
        this.$store.state.floatBasketPosition = {
          x: e.clientX - 30,
          y: e.clientY - 30,
        };
        //
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (sessionStorage) {
          sessionStorage.setItem(
            // 保存数据
            "floatBasketPosition",
            JSON.stringify(this.$store.state.floatBasketPosition),
          );
        }
      };
    },
  },
  computed: {
    count() {
      let count = 0;
      this.$store.state.cartItems.forEach((cartItem) => {
        count += cartItem.num;
      });
      return count;
    },
    cartItems() {
      return this.$store.state.cartItems;
    },
    positionX() {
      return this.$store.state.floatBasketPosition.x;
    },
    positionY() {
      return this.$store.state.floatBasketPosition.y;
    },
  },
};
</script>

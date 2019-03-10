<template>
  <div class="container">
    <el-checkbox v-model="cart.select" style="width:0px;vertical-align:top"></el-checkbox>
    <img class="img" :src="cart.fruitImgUrl">
    <div class="title">
      <a>{{cart.fruitTitle}}</a>
      <span>简介：{{cart.summary||"无"}}</span>
    </div>
    <div class="price">
      <p>￥{{cart.price}}</p>
      <i>￥{{cart.originalPrice}}</i>
      <span>规格：{{cart.unit}}</span>
    </div>
    <div class="change-num-wapper">
      <div class="change-num">
        <span @click="increase" class="increase"></span>
        <input @change="changeNumHandle" class="num" v-model="cart.num">
        <span @click="reduce(cart.id)" class="reduce"></span>
      </div>
    </div>
    <div class="total">
      <span>￥{{total}}</span>
    </div>
    <div>
      <i title="删除" @click="delCart(cart.id)" class="iconfont icon-delete remove-cart-item"></i>
    </div>
  </div>
</template>

<script>
import { updateCart, deleteCart } from "api/api";

export default {
  props: {
    cart: {
      required: true,
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    changeNumHandle() {
      updateCart({ id: this.cart.id, num: this.cart.num });
    },
    reduce() {
      if (this.cart.num > 0) {
        this.cart.num -= 1;
        const { num } = this.cart;
        const values = { num };
        updateCart({ id: this.cart.id, values });
      }
    },
    increase() {
      this.cart.num += 1;
      const { num } = this.cart;
      const values = { num };
      updateCart({ id: this.cart.id, values });
    },
    delCart(id) {
      deleteCart(id)
        .then(({ data }) => {
          if (data.success) {
            this.$notify({
              message: "移除成功"
            });

            if (this.cart.select) {
              this.$emit("updateFatherTotal", -this.total);
            }
            this.$emit("remove", id);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  computed: {
    total() {
      return Number(this.cart.price) * Number(this.cart.num);
    }
  },
  mounted() {
    if (this.cart.select) {
      this.$emit("updateFatherTotal", this.total);
    }
  },
  watch: {
    total(newVal, oddVal) {
      if (this.cart.select) {
        this.$emit("updateFatherTotal", newVal - oddVal);
      }
    },
    ["cart.select"]: function(newVal) {
      updateCart({ id: this.cart.id, values: { select: newVal } });
      if (newVal) {
        this.$emit("updateFatherTotal", this.total);
      } else {
        this.$emit("updateFatherTotal", -this.total);
      }
    }
  }
};
</script>
<style scoped>
.container {
  position: relative;
  height: 100px;
  display: flex;
  margin: 5px 0;
}
.container > div {
  display: inline-block;
  width: 200px;
  text-align: center;
  vertical-align: top;
  padding-top: 20px;
}
.img {
  width: 100px;
  height: 100px;
}
.title {
  height: 100%;
  width: 200px;
  margin: 0 10px;
}
.title > a {
  display: block;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
}
.title > a:hover {
  color: #175199;
}
.title > span {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #909399;
}
.price {
  width: 200px;
  margin: 0 20px;
}
.price > p {
  display: block;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: tomato;
}
.price > i {
  display: block;
  text-align: center;
  margin-top: 10px;
  text-decoration: line-through;
  color: #909399;
}
.change-num {
  position: relative;
  display: inline-block;
}
.change-num-wapper {
  display: inline-block;
  width: 200px;
  text-align: center;
  padding-top: 40px !important;
}
.increase {
  display: inline-block;
  position: absolute;
  border: 10px solid transparent;
  border-right: 10px solid #f56c6c;
  left: -23px;
  top: 2px;
  user-select: none;
  cursor: pointer;
}
.reduce {
  position: absolute;
  display: inline-block;
  border: 10px solid transparent;
  border-left: 10px solid #f56c6c;
  right: -23px;
  top: 2px;
  user-select: none;
  cursor: pointer;
}
.num {
  display: inline-block;
  box-sizing: border-box;
  width: 25px;
  height: 25px;
  border: 1px solid #c0c4cc;
  text-align: center;
  outline: none;
  line-height: 25px;
  font-size: 13px;
  border-radius: 15px;
}
.total {
  width: 200px;
  text-align: center;
}
.total > span {
  display: inline-block;
  margin-top: 30px;
}
.remove-cart-item {
  display: inline-block;
  margin-top: 25px;
  font-size: 25px;
  cursor: pointer;
  color: red;
}
</style>

<template>
  <el-card shadow="hover" :body-style="{ padding: '0px' }" class="card">
    <div class="img-container">
      <img :src="fruit.fruitImgUrl">
    </div>
    <div class="footer">
      <el-tooltip class="tool-tip" effect="dark" :content="fruit.fruitTitle" placement="top">
        <em class="title">{{fruit.fruitTitle}}</em>
      </el-tooltip>
      <span class="summary">{{summary}}</span>
      <div class="price">
        <em>￥{{fruit.price}}</em>
        <span class="original-price">{{this.fruit.originalPrice}}</span>
      </div>
      <div class="clearfix">
        <span class="buyer-count fl">
          已有
          <i>{{fruit.buyerCount}}</i>人购买
        </span>
        <span @click="addCartItem" class="shop-card fr">
          <i class="iconfont icon-cart"></i>加入购物车
        </span>
      </div>
    </div>
  </el-card>
</template>
<style scoped>
.card {
  box-sizing: border-box;
  width: 100%;
}
.img-container {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  max-height: 400px;
  overflow: hidden;
}

.img-container img {
  width: 100%;
  height: 100%;
}
.footer {
  padding: 15px;
  border-radius: 5px 5px 0 0;
  background-color: #f4f4f4;
}
.title {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.summary {
  display: block;
  margin-top: 10px;
  font-size: 13px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.price span {
  display: inline-block;
  margin-left: 10px;
  font-size: 15px;
  color: #909399;
  text-decoration: line-through;
}
.price {
  margin-top: 10px;
}
.price em {
  display: inline-block;
  color: #e23f50;
  font-size: 25px;
}
.buyer-count {
  line-height: 24px;
}
.buyer-count i {
  color: #67c23a;
}
.shop-card {
  padding: 5px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 3px;
  background-color: red;
}
.shop-card i {
  margin: 0 5px;
}
.ball {
  position: fixed;
  display: block;
  width: 10px;
  height: 10px;
}
</style>

<script>
import { ADD_CART_ITEM_MUTATION } from "store/mutationType";

export default {
  props: {
    fruit: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },

  computed: {
    summary() {
      return `简介：${this.fruit.summary ? this.fruit.summary : "无"}`;
    }
  },
  methods: {
    addCartItem() {
      const fruit = {
        ...this.fruit
      };
      this.$store.commit(ADD_CART_ITEM_MUTATION, fruit.id);
    }
  }
};
</script>

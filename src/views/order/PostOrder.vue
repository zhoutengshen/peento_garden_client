<template>
  <div class="main">
    <div class="shipping">
      <p>
        配送到：
        <em>{{fullAdress}}</em>
        <i slot="reference" class="iconfont icon-shipping" @click="navToPersonalHandle"></i>
      </p>
      <p>
        手机号码：
        <em>{{phone}}</em>
        收货人：
        <em>{{consignee}}</em>
        <i slot="reference" class="iconfont icon-receive" @click="navToPersonalHandle"></i>
      </p>
    </div>
    <div v-for="fruit in fruitItems" :key="fruit.fruitId">
      <img class="fruit-img" :src="fruit.fruitImgUrl">
      <span class="title">{{fruit.fruitTitle}}</span>
      <span class="num">
        数量：
        <i>{{fruit.num}}</i>
      </span>
      <span class="price">
        ￥
        <i>{{Number(fruit.price) * Number(fruit.num) }}</i>
      </span>
    </div>
    <div class="clearfix">
      <el-select v-model="paymentType" placeholder="支付方式" class="fr" style="width:200px">
        <el-option :disabled="true" value="1" label="支付宝付款"></el-option>
        <el-option :disabled="true" value="2" label="微信支付"></el-option>
        <el-option value="0" label="到付"></el-option>
      </el-select>
      <el-button class="fr" type="danger">￥{{total}}</el-button>
      <el-button class="fr" type="success" @click="submitOrderHandle">提交订单</el-button>
    </div>
  </div>
</template>
<style scoped>
.main {
  padding: 20px;
}
.shipping > p {
  display: block;
  margin: 10px;
  text-align: end;
  line-height: 30px;
  font-size: 20px;
}
.shipping i {
  display: inline-block;
  color: red;
  font-size: 1.5em;
  vertical-align: top;
  margin-left: 20px;
  vertical-align: top;
  cursor: pointer;
}
.shipping em {
  color: #e6a23c;
  font-weight: 600;
}
.fruit-img {
  width: 80px;
  height: 80px;
}
.title,
.num,
.price {
  display: inline-block;
  vertical-align: top;
  line-height: 80px;
  margin: 0 20px;
  font-size: 20px;
  font-weight: 600;
  color: #409eff;
}
.title {
  width: 500px;
}
.num,
.rpice {
  width: 100px;
  color: #909399;
}
.num > i,
.price > i {
  color: tomato;
}
</style>
<script>
import {
  fetchMyCartInfo,
  getAddress,
} from "api/api";
import humps from "humps";

export default {
  components: {},
  data() {
    return {
      fruitItems: [],
      fullAdress: "XXX省XXX市XXX区",
      phone: "XXXXXXXXXXX",
      consignee: "XXX",
      total: 0,
      paymentType: undefined,
    };
  },
  methods: {
    submitOrderHandle() {
      if (this.paymentType == undefined) {
        this.$message({
          message: "请选择支付方式",
        });
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "订单生成中....",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.8)",
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    navToPersonalHandle() {
      this.$router.push({
        name: "personal",
      });
    },
  },
  mounted() {
    fetchMyCartInfo().then(({ data }) => {
      let { carts } = data;
      carts = humps.camelizeKeys(carts);
      this.fruitItems = carts.filter((item) => {
        if (item.select) {
          this.total += Number(item.price) * Number(item.num);
        }
        return !!item.select;
      });
    });
    getAddress().then(({ data }) => {
      const { address } = data;
      this.consignee = address.username;
      this.phone = address.mobile;
      this.fullAdress = `${address.province}-${address.city}-${address.area}-${
        address.detailedAddress
      }`;
    });
  },
  computed: {},
};
</script>

<template>
  <div class="clearfix main">
    <div class="clearfix">
      <el-form class="form fr">
        <el-form-item label="省" label-width="100px">
          <el-select
            value-key="id"
            v-model="provinceValue"
            @change="selectChangeHandle('province',$event)"
          >
            <el-option
              v-for="province in provinces"
              :key="province.id"
              :value="province"
              :label="province.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="市" label-width="100px">
          <el-select value-key="id" v-model="cityValue" @change="selectChangeHandle('city',$event)">
            <el-option v-for="city in cities" :key="city.id" :value="city" :label="city.name"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="地区" label-width="100px">
          <el-select value-key="id" v-model="areaValue" @change="selectChangeHandle('area',$event)">
            <el-option v-for="arae in areas" :key="arae.id" :value="arae" :label="arae.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px">
          <el-input
            placeholder="详细地址"
            v-model="detailedAddress"
            @change="detailedAddressChangeHandle"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" label-width="100px">
          <el-input placeholder="手机号码" v-model="phone"></el-input>
        </el-form-item>
        <el-form-item label="收件人" label-width="100px">
          <el-input placeholder="收件人" v-model="username"></el-input>
        </el-form-item>
      </el-form>
      <div class="fl sunmary">
        <p>
          <label class="lable">手机号码：</label>
          <em class="inof-lable">{{phone}}</em>
        </p>
        <p>
          <label class="lable">收货人：</label>
          <em class="inof-lable">{{username}}</em>
        </p>
        <p>
          <label class="lable">详细地址：</label>
          <em class="full-adress">{{fullAdress}}</em>
        </p>
      </div>
    </div>
    <div class="fr">
      <el-button
        type="success"
        icon="el-icon-check"
        @click="submitHandle"
      >{{hasAddress?"提交修改":"添加收货地址"}}</el-button>
    </div>
  </div>
</template>
<script>
import {
  getProvinces,
  getCities,
  getAreas,
  getAddress,
  putAddress,
  postAddress,
} from "api/api";

export default {
  components: {
  },
  data() {
    return {
      fruitItems: [],
      provinces: [],
      cities: [],
      areas: [],
      provinceValue: {},
      cityValue: {},
      areaValue: {},
      detailedAddress: "",
      fullAdress: "XXX省XXX市XXX区",
      phone: "XXXXXXXXXXX",
      username: "XXX",
      hasAddress: false,
    };
  },
  methods: {
    submitHandle() {
      const values = {
        username: this.username,
        mobile: this.phone,
        province: this.provinceValue.name,
        city: this.cityValue.name,
        area: this.areaValue.name,
        detailedAddress: this.detailedAddress,
      };
      if (
        !values.detailedAddress
        || !values.username
        || !values.province
        || !values.city
        || !values.area
        || !values.mobile
      ) {
        this.$message({
          message: "输入不能为空",
          type: "error",
        });
        return;
      }
      (!this.hasAddress
        ? postAddress({ values })
        : putAddress({ values })
      ).then(({ data }) => {
        if (data.success) {
          this.$notify({
            message: data.msg,
          });
        } else {
          this.$notify({
            message: data.msg,
          });
        }
      });
    },
    detailedAddressChangeHandle() {
      this.fullAdress = `${this.provinceValue.name}-${this.cityValue.name}-${
        this.areaValue.name
      }-${this.detailedAddress}`;
    },
    selectChangeHandle(type, { id }) {
      this.fullAdress = `${this.provinceValue.name}-${this.cityValue.name}-${
        this.areaValue.name
      }-${this.detailedAddress}`;
      if (type === "province") {
        this.cityValue = "";
        this.areaValue = "";
        this.areas = [];
        this.cities = [];
        getCities(id).then(({ data }) => {
          if (data.success) {
            this.cities = data.cities;
          }
        });
      }
      if (type === "city") {
        this.areaValue = "";
        this.areas = [];
        getAreas(id).then(({ data }) => {
          if (data.success) {
            this.areas = data.areas;
          }
        });
      }
    },
  },
  mounted() {
    getProvinces().then(({ data }) => {
      if (data.success) {
        this.provinces = data.provinces;
      }
    });
    getAddress().then(({ data }) => {
      if (data.success) {
        const { address } = data;
        this.provinceValue = address.province;
        this.cityValue = address.city;
        this.areaValue = address.area;
        this.phone = address.mobile;
        this.username = address.username;
        this.detailedAddress = address.detailedAddress;
        this.hasAddress = true;
        this.fullAdress = `${this.provinceValue}-${this.cityValue}-${
          this.areaValue
        }-${this.detailedAddress}`;
      } else {
        this.phone = this.$store.state.user.mobile;
        this.username = this.$store.state.user.username;
        this.hasAddress = false;
      }
    });
  },
  computed: {},
};
</script>

<style scoped>
.main {
  padding: 20px;
}
.form {
  width: 50%;
}
.inof-lable {
  font-size: 40px;
  font-weight: 600;
  text-shadow: 2px 4px 6px #666;
}
.lable {
  display: inline-block;
  width: 100px;
  text-align: right;
}
.full-adress {
  font-size: 20px;
  font-weight: 600;
  text-shadow: 2px 4px 6px #666;
  line-height: 30px;
}
.sunmary {
  width: 50%;
}
.sunmary > p {
  display: block;
  margin-top: 20px;
}
</style>
<style>
</style>

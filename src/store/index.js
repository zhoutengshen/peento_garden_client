'user strict';

import createLogger from 'vuex/dist/logger';
import axios from 'axios';
import Vuex from "vuex";
import Vue from "vue";
import mockData from 'mock/fruits.json';
import {
  ADD_CART_ITEM_MUTATION,
  DEL_CART_ITEM_MUTATION,
  SET_USER_MUTATION,
  FETCH_ALL_PRODUCTIONS_MUTATION,
} from './mutationType';
import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  FETCH_ALL_PRODUCTIONS_ACTION,
} from './actionType';

// let user = null;
// let cartItems = [];
// try {
//   user = JSON.parse(sessionStorage.getItem('user')) || null;
// } catch (error) {
//   user = null;
// }

// try {
//   cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
//   console.log(cartItems);
// } catch (error) {
//   cartItems = [];
// }

//获取sessionStore里面的数据
let data = {};
for (let k of Object.keys(sessionStorage)) {
  data[k] = JSON.parse(sessionStorage.getItem(k));
}

const storeCfg = {
  plugins: [createLogger()],
  state: {
    cartItems: [],
    user: null, // 刷新状态保存,
    allFruits: [],
    floatBasketPosition: {
      x: 20, y: 20
    },
    ...data,
  },
  getters: {
    cartItemsLength: state => state.cartItems.length,
    user: state => state.user,

  },
  actions: {
    [LOGIN_ACTION](ctx, data) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/api/login',
          method: 'POST',
          data,
        }).then(({ data }) => {
          if (data.success) {
            const { user } = data;
            ctx.commit(SET_USER_MUTATION, user);
          }
          resolve(data);
        }).catch((e) => {
          reject(e);
        });
      });
    },
    [LOGOUT_ACTION](ctx) {
      return new Promise((resolve, rejuct) => {
        axios({
          url: '/api/logout',
          method: 'GET',
        }).then(({ data }) => {
          if (data.success) {
            ctx.commit(SET_USER_MUTATION, null);
          }
          resolve(data);
        }).catch(rejuct);
      });
    },
    [FETCH_ALL_PRODUCTIONS_ACTION](ctx, { limit = 10, offset = 0 }) {
      axios({
        url: `/api/fruits?limit=${limit}&offset=${offset}`,
        method: "GET",
      }).then(({ data }) => {
        if (data.success) {
          ctx.commit(FETCH_ALL_PRODUCTIONS_MUTATION, data.fruits);
          console.log(data.fruits);
        }
      })
    },
  },
  mutations: {
    [ADD_CART_ITEM_MUTATION](state, id) {
      console.log(state.cartItems);
      const cardItem = state.allFruits.find(item => item.id == id);
      if (cardItem) {
        state.cartItems.push(cardItem);
        const cartItemsStr = JSON.stringify(state.cartItems);
        sessionStorage.setItem('cartItems', cartItemsStr);
      }
    },
    [DEL_CART_ITEM_MUTATION](state, id) {
      const index = state.cartItems.findIndex(item => item.id == id);
      state.cartItems.splice(index, 1);
      const cartItemsStr = JSON.stringify(state.cartItems);
      sessionStorage.setItem('cartItems', cartItemsStr);
    },
    [SET_USER_MUTATION](state, user) {
      state.user = user;
      try {
        const userStr = JSON.stringify(user);
        sessionStorage.setItem('user', userStr);
      } catch (error) {
        console.log('user 信息格式化错误');
      }
    },
    [FETCH_ALL_PRODUCTIONS_MUTATION](state, fruits) {
      state.allFruits = fruits;
    },
  },
};

Vue.use(Vuex);
const store = new Vuex.Store(storeCfg);
export default store;

"user strict";

import createLogger from "vuex/dist/logger";
import Vuex from "vuex";
import Vue from "vue";
import {
  fetchFruits,
  login,
  logout,
} from "api/api";

import {
  ADD_CART_ITEM_MUTATION,
  DEL_CART_ITEM_MUTATION,
  SET_USER_MUTATION,
  FETCH_ALL_PRODUCTIONS_MUTATION,
} from "./mutationType";
import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  FETCH_ALL_PRODUCTIONS_ACTION,
} from "./actionType";


// 获取sessionStore里面的数据
const data = {};
for (const k of Object.keys(sessionStorage)) {
  data[k] = JSON.parse(sessionStorage.getItem(k));
}

const storeCfg = {
  plugins: [createLogger()],
  state: {
    cartItems: [],
    user: null, // 刷新状态保存,
    hasLogin: false,
    allFruits: [],
    floatBasketPosition: {
      x: 20, y: 20,
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
        login(data)
          .then(({ data }) => {
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
        logout().then(({ data }) => {
          if (data.success) {
            ctx.commit(SET_USER_MUTATION, null);
          }
          resolve(data);
        }).catch(rejuct);
      });
    },
    [FETCH_ALL_PRODUCTIONS_ACTION](ctx, { limit = 10, offset = 0 }) {
      fetchFruits({ limit, offset }).then(({ data }) => {
        if (data.success) {
          ctx.commit(FETCH_ALL_PRODUCTIONS_MUTATION, data.fruits);
        }
      });
    },

  },
  mutations: {
    [ADD_CART_ITEM_MUTATION](state, id) {
      const cardItem = state.allFruits.find(item => item.id == id);
      if (cardItem) {
        state.cartItems.push(cardItem);
        const cartItemsStr = JSON.stringify(state.cartItems);
        sessionStorage.setItem("cartItems", cartItemsStr);
      }
    },
    [DEL_CART_ITEM_MUTATION](state, id) {
      const index = state.cartItems.findIndex(item => item.id == id);
      state.cartItems.splice(index, 1);
      const cartItemsStr = JSON.stringify(state.cartItems);
      sessionStorage.setItem("cartItems", cartItemsStr);
    },
    [SET_USER_MUTATION](state, user) {
      if (user) {
        state.hasLogin = true;
      } else {
        user = {};
        state.hasLogin = false;
      }
      state.user = user;
      try {
        const userStr = JSON.stringify(user);
        sessionStorage.setItem("user", userStr);
        sessionStorage.setItem("hasLogin", JSON.stringify(state.hasLogin));
      } catch (error) {
        console.log("user 信息格式化错误");
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

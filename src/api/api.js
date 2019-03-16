import axios from "axios";
import md5 from "js-md5";

export const fetchUserInfo = () => axios({
  url: "/api/user",
  method: "GET",
});

export const fetchFruits = ({ limit, offset }) => axios({
  url: `/api/fruit/list?limit=${limit}&offset=${offset}`,
  method: "GET",
});
export const login = data => axios({
  url: "/api/login",
  method: "POST",
  data,
});

export const register = (data) => {
  const { pass } = data;
  const result = {
    ...data,
    password: md5(pass), // 加密
  };
  return axios({
    url: "/api/user",
    method: "POST",
    data: result,
  });
};
export const logout = () => axios({
  url: "/api/logout",
  method: "GET",
});
export const updateUserInfo = ({ id, values }) => axios({
  url: "/api/user",
  data: {
    id, values,
  },
  method: "PUT",
});

export const uploadImg = formData => axios({
  url: "/api/upload/img",
  data: formData,
  method: "POST",
});

export const fetchMyCartInfo = () => axios({
  url: "/api/cart/carts",
  method: "GET",
});

export const addCarts = carts => axios({
  url: "/api/cart/carts",
  method: "POST",
  data: {
    carts,
  },
});

export const updateCart = ({ id, values }) => {
  console.log(values);
  return axios({
    url: "/api/cart/carts",
    method: "PUT",
    data: {
      id,
      values,
    },
  });
};

export const deleteCart = id => axios({
  url: `/api/cart/carts/${id}`,
  method: "DELETE",
});

export // 提交购物车选中的商品，生成订单
  const postOrder = carts => axios({
    url: "/api/order",
    method: "POST",
    data: carts,
  });


export const getProvinces = () => axios({
  url: "/api/city/province",
  method: "GET",
});
export const getCities = id => axios({
  url: `/api/city/city/${id}`,
  method: "GET",
});
export const getAreas = id => axios({
  url: `/api/city/area/${id}`,
  method: "GET",
});
export const getAddress = () => axios({
  url: "/api/address",
  method: "GET",
});

export const putAddress = ({ values }) => axios({
  url: "/api/address",
  method: "PUT",
  data: {
    values,
  },
});
export const postAddress = ({ values }) => axios({
  url: "/api/address",
  method: "POST",
  data: {
    values,
  },
});

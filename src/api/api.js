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

export const addCarts = (carts) => {
  return axios({
    url: "/api/cart/carts",
    method: "POST",
    data: {
      carts
    },
  });
}
export const updateCart = ({id,num})=>{
  return axios({
    url:"/api/cart/carts",
    method:"PUT",
    data:{
      id,
      num,
    }
  });
}

export const deleteCart = (id)=>{
  return axios({
    url:`/api/cart/carts/${id}`,
    method:"DELETE"
  })
}

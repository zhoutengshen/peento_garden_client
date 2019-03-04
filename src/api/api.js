import axios from "axios";
import md5 from "js-md5";

export const fetchUserInfo = () =>
  axios({
    url: "/api/user",
    method: "GET"
  });

export const fetchFruits = ({ limit, offset }) =>
  axios({
    url: `/api/fruit/list?limit=${limit}&offset=${offset}`,
    method: "GET",
  })
export const login = data =>
  axios({
    url: "/api/login",
    method: 'POST',
    data,
  });

export const register = (data) => {
  const { pass } = data;
  const result = {
    ...data,
    password:md5(pass) // 加密
  };
  return axios({
    url: "/api/user",
    method: "POST",
    data:result
  });
}
export const logout = () =>
  axios({
    url: "/api/logout",
    method: "GET",
  })
export const updateUserInfo = ({ id, values }) => {
  return axios({
    url: "/api/user",
    data: {
      id, values
    },
    method: "PUT"
  })
}

export const uploadImg = (formData) => {
  return axios({
    url: "/api/upload/img",
    data: formData,
    method: "POST"
  });
}

import axios from "axios";
export const fetchUserInfo = () =>
  axios({
    url: "/api/user/info",
    method:"GET"
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

export const logout = () =>
  axios({
    url: "/api/logout",
    method: "GET",
  })

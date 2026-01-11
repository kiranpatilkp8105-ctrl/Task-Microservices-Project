import axios from "axios";

const BASE_URL = "http://localhost:8085/users";

export const registerUser = (user) => axios.post(`${BASE_URL}/register`, user);
export const loginUser = (user) => axios.post(`${BASE_URL}/login`, user);

export const getAllUsers = () => axios.get(BASE_URL);
export const updateUser = (id, user) =>
  axios.put(`${BASE_URL}/${id}`, user);
export const deleteUser = (id) =>
  axios.delete(`${BASE_URL}/${id}`);

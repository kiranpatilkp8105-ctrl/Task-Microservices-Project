import axios from "axios";

const BASE_URL = "http://localhost:8086/tasks";

// GET tasks by user
export const getTasksByUser = (userId) => {
  return axios.get(`${BASE_URL}/user/${userId}`);
};

// CREATE task
export const createTask = (task) => {
  return axios.post(BASE_URL, task); 
};

// UPDATE task
export const updateTask = (id, task) => {
  return axios.put(`${BASE_URL}/${id}`, task); 
};

// DELETE task
export const deleteTask = (id) => {
  return axios.delete(`${BASE_URL}/${id}`); 
};

import axios from "axios";

const API = axios.create({
  // baseURL: "http://127.0.0.1:8000/api/",
  baseURL: "https://translator-be-drk5.onrender.com/api/",
});

export default API;
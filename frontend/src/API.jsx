import axios from "axios";

// Base URL for all API requests
const API = axios.create({
  baseURL: "http://localhost:3000", // replace with env variable in production
});


export default API;
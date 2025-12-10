import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", 
});


export default API;


// import axios from "axios";

// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL, // uses .env variable
// });

// export default API;
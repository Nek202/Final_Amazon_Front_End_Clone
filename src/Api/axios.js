import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/back-end-clone/us-central1/api",
  baseURL: "http://localhost:2030/",
});

export { axiosInstance };

//  http://localhost:2030/payment/create

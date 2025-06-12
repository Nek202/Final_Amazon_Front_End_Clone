import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/back-end-clone/us-central1/api",
  baseURL: "http://localhost:2030/",
  //deployed version of amazon server render.com"//
  baseURL: "https://amazon-expressedbased-deploy.onrender.com/",
});

export { axiosInstance };

//  http://localhost:2030/payment/create

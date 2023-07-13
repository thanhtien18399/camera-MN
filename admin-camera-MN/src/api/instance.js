import axios from "axios";

const instance =axios.create({
    baseURL: "http://localhost:4000/api",
});
instance.interceptors.request.use((config)=>{
  config.headers={
    ...config.headers,
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  return config;
})
export default instance
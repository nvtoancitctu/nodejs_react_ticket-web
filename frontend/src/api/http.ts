import axios from "axios";
const http = axios.create({ baseURL: `http://localhost:5000/api` });
http.interceptors.request.use(cfg => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
export default http;

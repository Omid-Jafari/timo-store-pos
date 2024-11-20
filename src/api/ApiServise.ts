import toast from "react-hot-toast";
import axios from "axios";
const lang = localStorage.getItem("lang") || "";
const token = localStorage.getItem("token") || "";
const cartIdentifier = localStorage?.getItem("cartIdentifier") || "";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}${
  lang && lang !== "fa" ? `/${lang}` : ""
}/`;
const useAxios = axios.create({
  baseURL: BASE_URL,
});

const handleUnauthorized = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
  window.location.pathname !== "/login" && window.location.replace("/login");
};

useAxios.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    if (cartIdentifier) {
      config.headers["Cart-Identifier"] = `${cartIdentifier}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

useAxios.interceptors.response.use(
  (response) => {
    if (response.data.message && response.data.message != "")
      toast.success(response.data.message);
    return response;
  },
  (error) => {
    if (error?.response?.status === 404) {
      toast.error("404 error");
    } else if (Object.values(error?.response?.data)?.length > 0) {
      Object.values(error?.response?.data)?.map((err: any) => toast.error(err));
    }
    if (error.response.status == 401) {
      handleUnauthorized();
    }

    return Promise.reject(error);
  }
);

export default useAxios;

import axios from "axios";

const env = import.meta.env.VITE_ENVIRONMENT;
const apiUrl = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = apiUrl;

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return error.response;
  },
);
export default axios;

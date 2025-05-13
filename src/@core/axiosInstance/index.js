import axios from "axios";
import toast from "react-hot-toast";

const instance = axios.create({
  baseURL: "https://classapi.sepehracademy.ir/api",
});

instance.interceptors.request.use((config) => {
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
    config.data = JSON.stringify(config.data); // اضافه کردن هوشمند نوع داده به صورت داینامیک
  }
  const token = localStorage.getItem("accessToken");

  if (token) {
    const cleantoken = token.slice(1, -1);
    config.headers.Authorization = `Bearer ${cleantoken}`; // اضافه کردن توکن به هدر در صورت وجود
  }

  return config;
});
const onSuccess = (response) => {
  return response.data;
};

const onError = (error) => {
  if (error) {
    console.log(error);
    const { status, data } = error.response;

    switch (status) {
      case 400:
        console.error("Bad Request:", data);
        toast.error(data.ErrorMessage);
        break;
      case 401:
        toast.error("توکن احراز هویت باطل شده لطفا دوباره وارد شوید");
        localStorage.clear("token");
        console.error("Unauthorized:", data);
        break;
      case 404:
        console.error("Not Found:", data);
        toast.error(data.ErrorMessage);
        break;
      case 422:
        console.error("Some Thing Went Wrong:", data);
        toast.error(data.ErrorMessage);
        break;
      case 500:
        console.error("Server Error:", data);
        toast.error(data.ErrorMessage);
        break;
      default:
        console.error("Unhandled Error:", data);
        toast.error("This didn't work.");
    }
  }

  return Promise.reject(error);
};

instance.interceptors.response.use(onSuccess, onError);

export default instance;

import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
    },
});

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("accessToken");
//         if (token) {
//             config.headers["Authorization"] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("acessToken");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
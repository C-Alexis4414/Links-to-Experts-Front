import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    // headers: {
    //     "Content-Type": "application/json",
    //     Accept: 'application/json',
    // },
});

const navigate = useNavigate();

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized, attempting to refresh token");
            try {
                await axiosInstance.post("/authentication/refresh");
                return axiosInstance.request(error.config);
            } catch (err) {
                console.error("Failed to refresh token", err);
                navigate("/login");
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
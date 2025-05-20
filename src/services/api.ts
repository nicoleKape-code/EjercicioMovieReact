import axios from "axios";
import Config from "@/config";

// Create an Axios instance
const api = axios.create({
    baseURL: Config.API_URL,
    timeout: 5000,
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const newConfig = { ...config }; //Creamos esta copia con los tres puntos
        newConfig.headers.Authorization = `Bearer ${
            process.env.NEXT_PUBLIC_MOVIE_API_KEY
        }`;  //Aquí pueden haber diferentes tipso de autorizaciónes como un token
        newConfig.headers.accept = "application/json";
        console.log("Making requesto to: ", newConfig.url);
        return newConfig; 
    },
    (error) => {
        console.error("Request error: ", error);
        return Promise.reject(error);
    }

); //request es apra cualquier cosa que salga, response es para que llega

// Response Interceptor
api.interceptors.response.use(
    (response) => response, 
    (error) => {
        console.error("Response error: ", error);
        return Promise.reject(error);
    }

);

export default api; 

// Todo lo que se ponga aquó, aplica a todos los response y queste
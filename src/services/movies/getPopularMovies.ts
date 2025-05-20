import api from "../api";

export const getPopularMovies = async (page = 1) =>{
    let res: any;
    const endpoint = `/movie/popular?language=en-US&page=${page}`; //los query params siempre van después de un signo de interrofación
    await 
        api.get(endpoint)
        .then((data) => {
            res = data.data; //el primer data es la respuesta y dentro del segundo viene la respuesta
        }
    ).catch(
        (err) => {
            res = err.response; 
        }
    ); //va a concatenar cualquier cosa que vaya mandando el endpoint
    return res; 
};
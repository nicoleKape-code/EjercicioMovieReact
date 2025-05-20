import api from "../api";

export const getRecommendationMovies = async (id: number, page=1) => {
    try {
      const endpoint = `/movie/${id}/recommendations?language=en-US&page=${page}`;
      const response = await api.get(endpoint);
      return response.data;
    } catch (err: any) {
      return err.response;
    }
};
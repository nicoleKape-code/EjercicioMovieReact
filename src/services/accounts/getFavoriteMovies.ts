// src/services/accounts/getFavoriteMovies.ts
import api from "../api";

export const getFavoriteMovies = async (guestSessionId: string, page: number = 1) => {
  try {
    const { data } = await api.get(
      `/account/${guestSessionId}/favorite/movies?language=en-US&page=${page}&sort_by=created_at.asc`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

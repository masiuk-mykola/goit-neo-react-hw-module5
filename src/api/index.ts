import axios, { type AxiosRequestConfig } from "axios";

import type {
  Credits,
  Movie,
  MovieDetails,
  PaginatedResponse,
  Review,
} from "@/types/movie";

const API_KEY = import.meta.env.VITE_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const fetchData = async <T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const response = await axiosInstance.get<T>(url, config);
  return response.data;
};

export const getImagePath = (path: string | null, width = 300): string =>
  path ? `${IMAGE_BASE_URL}w${width}${path}` : "/assets/images/no-image.webp";

export const getTrendingMovies = (): Promise<PaginatedResponse<Movie>> =>
  fetchData("/trending/movie/day?language=en-US");

export const getMovieDetails = (id: string): Promise<MovieDetails> =>
  fetchData(`/movie/${id}?language=en-US`);

export const getMovieCast = (id: string): Promise<Credits> =>
  fetchData(`/movie/${id}/credits?language=en-US`);

export const getMovieReviews = (id: string): Promise<PaginatedResponse<Review>> =>
  fetchData(`/movie/${id}/reviews?language=en-US`);

export const searchMovies = (query: string): Promise<PaginatedResponse<Movie>> =>
  fetchData(`/search/movie?query=${encodeURIComponent(query)}&language=en-US`);

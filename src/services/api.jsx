import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API = "11d706a537e3b36e27b4779ed7c4a887";
const AUTORIZATION =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWQ3MDZhNTM3ZTNiMzZlMjdiNDc3OWVkN2M0YTg4NyIsInN1YiI6IjY1Zjk2Njg2Nzk4Yzk0MDE4NTE2NGJiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lWHKrgzhb9ju9K3w--iyL63urfGkWFSLMrlyFQZlGW0";

const options = {
  headers: {
    Authorization: `Bearer ${AUTORIZATION}`,
    accept: "application/json",
  },
};

export const requestTrendingMovies = async () => {
  const { data } = await axios.get(
    "/trending/movie/day?language=en-US",
    options
  );

  return data;
};

export const requestMoviesById = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}?language=en-US`, options);

  return data;
};

export const requestMovieReviews = async (movieId) => {
  const { data } = await axios.get(
    `/movie/${movieId}/reviews?language=en-US`,
    options
  );

  return data;
};

export const requestMovieCast = async (movieId) => {
  const { data } = await axios.get(
    `/movie/${movieId}/credits?language=en-US`,
    options
  );

  return data;
};

export const requestMoviesByQuery = async (query, page) => {
  const { data } = await axios.get(
    `/search/movie?query=${query}&language=en-US&page=${page}`,
    options
  );

  return data;
};

import { useEffect, useState } from "react";
import { requestTrendingMovies } from "../services/api.jsx";
import MovieList from "../components/MovieList/MovieList.jsx";
import Loader from "../components/Loader/Loader.jsx";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await requestTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <>
      {isloading && <Loader />}
      <p className={css.title}>Trending today:</p>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;

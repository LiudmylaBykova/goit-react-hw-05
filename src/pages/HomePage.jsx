import { useEffect, useState } from "react";
import { requestTrendingMovies } from "../services/api.jsx";
import MovieList from "../components/MovieList/MovieList.jsx";
import Loader from "../components/Loader/Loader.jsx";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsLoading(true);
      try {
        const data = await requestTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <>
      {isloading && <Loader />}
      <p>Trendies today:</p>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;

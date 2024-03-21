import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import Loader from "../components/Loader/Loader";
import MovieList from "../components/MovieList/MovieList";
import { requestMoviesByQuery } from "../services/api.jsx";
import ShowMoreBtn from "../components/ShowMoreBtn/ShowMoreBtn";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchMovies = async () => {
      try {
        setError(false);
        setIsLoading(true);
        setShowMoreBtn(false);
        const data = await requestMoviesByQuery(query, page);
        if (data.total_results === 0) {
          setMovies([]);
          toast("Sorry, we couldn't find any movies! Please, try again!", {
            position: "top-right",
          });
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
          setShowMoreBtn(data.total_pages && data.total_pages !== page);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [query, page]);

  const handleSearch = (searchQuery) => {
    if (searchQuery !== query) {
      setSearchParams({ query: searchQuery });
      setPage(1);
      setMovies([]);
    }
  };

  const handleSearchNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <Loader />}
      <MovieList movies={movies} />
      {showMoreBtn && <ShowMoreBtn onShowMore={handleSearchNextPage} />}
      <Toaster />
    </>
  );
};

export default MoviesPage;

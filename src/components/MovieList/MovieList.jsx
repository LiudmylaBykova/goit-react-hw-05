import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <>
      <ul>
        {movies !== null &&
          movies.map((movie) => {
            return (
              <li key={movie.id}>
                <Link
                  className={css.link}
                  state={location}
                  to={`/movies/ ${movie.id}`}
                >
                  {movie.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default MovieList;

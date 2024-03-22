import { useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { useEffect, useRef, useState } from "react";
import { requestMoviesById } from "../services/api";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Suspense, lazy } from "react";
import css from "./MovieDetailsPage.module.css";

const MovieReviews = lazy(() =>
  import("../components/MovieReviews/MovieReviews")
);
const MovieCast = lazy(() => import("../components/MovieCast/MovieCast"));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? "/home");

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    const fetchMoviesData = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await requestMoviesById(movieId);
        setMovieData(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesData();
  }, [movieId]);

  const vote = Math.floor(movieData.vote_average * 10);
  let releaseDate = movieData.release_date
    ? new Date(movieData.release_date).getFullYear()
    : "?";

  return (
    <>
      <Link className={css.link} to={backLinkHref.current}>
        <span>
          <BiArrowBack className={css.linkSvg} />
        </span>
        Go back to movies list
      </Link>
      {isloading && <Loader />}

      <div className={css.movieCardWrap}>
        <div className={css.movieCard}>
          <img
            src={
              movieData.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
                : defaultImg
            }
            width={400}
            alt={movieData.title}
          />
          <div>
            <p className={css.movieTitle}>
              {movieData.title}{" "}
              <span className={css.releaseDate}>({releaseDate})</span>
            </p>
            <p className={css.description}>
              User Score: <span className={css.descriptionSpan}>{vote}%</span>
            </p>
            <div className={css.ganresWrap}>
              <p className={css.description}>Ganres:</p>
              {movieData.genres && (
                <p className={css.description}>
                  {" "}
                  {movieData.genres.map((genre) => {
                    return (
                      <span className={css.ganre} key={genre.id}>
                        {genre.name}
                      </span>
                    );
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <p className={css.descriptionSpan}>Overview:</p>
          <p>{movieData.overview}</p>
        </div>

        <Link className={css.link} to="cast">
          Cast
        </Link>
        <Link className={css.link} to="reviews">
          Reviews
        </Link>
      </div>

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="cast" element={<MovieCast />}></Route>
          <Route path="reviews" element={<MovieReviews />}></Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;

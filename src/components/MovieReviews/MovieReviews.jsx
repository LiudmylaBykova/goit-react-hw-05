import { useParams } from "react-router-dom";
import { requestMovieReviews } from "../../services/api.jsx";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader.jsx";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviewsData, setMovieReviewsData] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovieReviewsData = async () => {
      setIsLoading(true);
      try {
        const data = await requestMovieReviews(movieId);
        setMovieReviewsData(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieReviewsData();
  }, [movieId]);
  return (
    <>
      {isloading && <Loader />}
      {movieReviewsData.length ? (
        <ul>
          {movieReviewsData.map((review) => {
            return (
              <li key={review.id}>
                <div className={css.reviewWrap}>
                  <p className={css.reviewAuthor}>Author: {review.author}</p>
                  <p className={css.reviewContent}>{review.content}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie !</p>
      )}
    </>
  );
};

export default MovieReviews;

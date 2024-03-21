import { useParams } from "react-router-dom";
import { requestMovieCast } from "../../services/api.jsx";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader.jsx";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCastData, setMovieCastData] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    const fetchMovieCastData = async () => {
      setIsLoading(true);
      try {
        const data = await requestMovieCast(movieId);
        setMovieCastData(data.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieCastData();
  }, [movieId]);
  return (
    <>
      {isloading && <Loader />}
      {movieCastData.length ? (
        <ul>
          {movieCastData.map((author) => {
            return (
              <li key={author.credit_id}>
                <img
                  src={
                    author.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${author.profile_path}`
                      : defaultImg
                  }
                  width={200}
                  alt={author.name}
                />

                <div>
                  <p>{author.original_name}</p>
                  <p>Character: {author.character}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No results!</p>
      )}
    </>
  );
};

export default MovieCast;

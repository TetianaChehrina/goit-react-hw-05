import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { fetchDetails } from "../../components/Api/Api";
import { useEffect, useState, Suspense, useRef } from "react";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import { GoArrowLeft } from "react-icons/go";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(false);
  const [genres, setGenres] = useState([]);
  const [release, setRelease] = useState("");
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    if (!movieId) return;
    const MovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchDetails(movieId);
        setMovie(response);
        setRelease(response.release_date.slice(0, 4));
        setGenres(response.genres);
        setError(false);
        console.log(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    MovieDetails();
  }, [movieId]);
  console.log(movieId);

  const { poster_path, title, vote_average, overview } = movie;

  return (
    <>
      <div>
        <div className={css.btnBack}>
          {error && <Error />}
          <button className={css.backLink_btn}>
            <Link to={backLinkRef.current} className={css.backLink}>
              <GoArrowLeft className={css.icon} />
              Go back
            </Link>
          </button>
        </div>

        {loading && <Loader />}
        <div className={css.container}>
          <img
            className={css.imageMovie}
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />

          <div className={css.movieInfo}>
            <h1 className={css.title}>{`${title} (${release})`}</h1>
            <h2 className={css.score}>
              User score: {`${Math.round(vote_average * 10)}%`}
            </h2>
            <h2 className={css.overview}>Overview</h2>
            <p>{overview}</p>
            <div className={css.genre}>
              <h3>Genres:</h3>
              <ul className={css.genreList}>
                {genres.map(({ id, name }) => (
                  <li key={id}>
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <p className={css.addInfo}>Additional information</p>
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
}

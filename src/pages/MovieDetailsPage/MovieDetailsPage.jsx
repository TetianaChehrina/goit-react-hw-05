import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { fetchDetails } from "../../components/Api/Api";
import { useEffect, useState, useRef } from "react";
import Error from "../../components/Error/Error";
// import Loader from "../../components/Loader/Loader";

export default function MovieDetailsPage({ onLoading }) {
  const { movieId } = useParams();
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
        onLoading(true);
        const response = await fetchDetails(movieId);
        setMovie(response);
        setRelease(response.release_date.slice(0, 4));
        setGenres(response.genres);
        setError(false);
        console.log(response);
      } catch (error) {
        setError(true);
      } finally {
        onLoading(false);
      }
    };
    MovieDetails();
  }, [movieId, onLoading]);
  console.log(movieId);

  const { poster_path, title, vote_average, overview } = movie;

  return (
    <div>
      {error && <Error />}
      <div>
        <div>
          <Link to={backLinkRef.current}>Go back</Link>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />
        </div>
        <h1>{`${title} (${release})`}</h1>
        <h2>User score: {`${Math.round(vote_average * 10)}%`}</h2>
        <h2>Overview</h2>
        <p>{overview}</p>
        <h3>Genres:</h3>
        <ul>
          {genres.map(({ id, name }) => (
            <li key={id}>
              <span>{name}</span>
            </li>
          ))}
        </ul>
        <p>Additional information</p>
      </div>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

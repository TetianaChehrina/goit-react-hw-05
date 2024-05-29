import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`movies/${movie.id}`} state={location}>
              {movie.title}{" "}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MovieList;

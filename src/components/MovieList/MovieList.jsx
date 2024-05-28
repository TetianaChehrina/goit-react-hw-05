import { Link } from "react-router-dom";

const MovieList = ({ movies }) => {
  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`movies/${movie.id}`}>{movie.title} </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MovieList;

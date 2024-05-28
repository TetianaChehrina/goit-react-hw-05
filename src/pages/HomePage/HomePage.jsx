import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../components/Api/Api";
import MovieList from "../../components/MovieList/MovieList";
import Error from "../../components/Error/Error";

const HomePage = ({ onLoading }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadTrendingMovie = async () => {
      try {
        onLoading(true);
        const movieTrending = await fetchTrendingMovies();
        console.log(movieTrending);
        setMovies(movieTrending.results);
      } catch (error) {
        setError(true);
      } finally {
        onLoading(false);
      }
    };
    loadTrendingMovie();
  }, [onLoading, setMovies, error]);
  return (
    <div>
      {error && <Error />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};
export default HomePage;

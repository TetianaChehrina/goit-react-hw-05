import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../components/Api/Api";
import MovieList from "../../components/MovieList/MovieList";
import Error from "../../components/Error/Error";
import css from "./HomePage.module.css";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTrendingMovie = async () => {
      try {
        setLoading(true);
        const movieTrending = await fetchTrendingMovies();
        console.log(movieTrending);
        setMovies(movieTrending.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadTrendingMovie();
  }, []);
  return (
    <div className={css.container}>
      {loading && <Loader />}
      {error && <Error />}
      <h1 className={css.title}>Trending today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};
export default HomePage;

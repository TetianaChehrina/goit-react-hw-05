import { useState, useEffect } from "react";
import { fetchMovie } from "../../components/Api/Api";
import { useSearchParams } from "react-router-dom";
import Error from "../../components/Error/Error";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movieSearch, setMovieSearch] = useState([]);
  // const [searchMovieName, setSearchMovieName] = useState("");
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchMovieName = searchParams.get("query");
    if (searchMovieName) {
      // setSearchMovieName(searchMovieName);

      const fetchSearchMovies = async () => {
        try {
          setError(false);
          // setSearchParams({ query: searchMovieName });
          const data = await fetchMovie(searchMovieName);
          setMovieSearch(data.results);
          console.log(data.results);
        } catch (error) {
          setError(true);
        }
      };
      fetchSearchMovies();
    }
  }, [searchParams]);

  const handleMovie = async (searchMovieName) => {
    // setSearchMovieName(searchMovieName);
    setSearchParams({ query: searchMovieName });
  };
  return (
    <div>
      {error && <Error />}
      <SearchForm onSearch={handleMovie} />
      {movieSearch.length > 0 && <MovieList movies={movieSearch} />}
    </div>
  );
};
export default MoviesPage;

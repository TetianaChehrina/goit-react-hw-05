import { useState, useEffect } from "react";
import { fetchMovie } from "../../components/Api/Api";
import { useSearchParams } from "react-router-dom";
import Error from "../../components/Error/Error";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movieSearch, setMovieSearch] = useState([]);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchMovieName = searchParams.get("searchMovieName") ?? "";

  useEffect(() => {
    if (searchMovieName) {
      const fetchSearchMovies = async () => {
        try {
          setError(false);
          const data = await fetchMovie(searchMovieName);
          setMovieSearch(data.results);
          console.log(data.results);
        } catch (error) {
          setError(true);
        }
      };
      fetchSearchMovies();
    }
  }, [searchParams, movieSearch, searchMovieName]);

  const handleMovie = async (searchMovieName) => {
    // searchParams.set("searchMovieName", topic);
    // setSearchParams(searchParams);
    setSearchParams({ query: searchMovieName });
  };
  return (
    <div>
      <SearchForm onSearch={handleMovie} />
      {error && <Error />}
      {movieSearch.length > 0 && <MovieList movies={movieSearch} />}
    </div>
  );
};
export default MoviesPage;

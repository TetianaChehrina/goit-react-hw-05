import axios from "axios";

const TOKEN_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2M3YzA2MjQ3ZGY1ZDFjNjI5ODk5MTVmZmYxNDlkYiIsInN1YiI6IjY2NTA4NWViNDMxNjhhODYyOTM1MGI1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y9C55qCLN9RF-ufiQ_0_0pMgyDrh3QMyGJosU9HZmgU";

axios.defaults.baseURL = "https://api.themoviedb.org";

export async function fetchMovie(searchQuery) {
  const response = await axios.get(
    `/3/search/movie`,
    {
      params: {
        query: searchQuery,
      },
    },
    {
      headers: {
        Accept: `application / json`,
        Authorization: `Bearer ${TOKEN_KEY}`,
      },
    }
  );
  return response.data;
}

export async function fetchTrendingMovies() {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN_KEY}`,
      },
    }
  );
  return response.data;
}

export async function fetchReviews(movie_id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/reviews`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN_KEY}`,
      },
    }
  );
  return response;
}

export async function fetchCast(movie_id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits`,
    {
      headers: {
        Accept: `application / json`,
        Authorization: `Bearer ${TOKEN_KEY}`,
      },
    }
  );
  return response;
}

export async function fetchDetails(movie_id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}`,
    {
      headers: {
        Accept: `application / json`,
        Authorization: `Bearer ${TOKEN_KEY}`,
      },
    }
  );
  return response.data;
}

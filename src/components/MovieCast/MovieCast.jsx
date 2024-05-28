import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCast } from "../Api/Api";
import Error from "../Error/Error";

export default function MovieCast() {
  const [castAll, setCastAll] = useState([]);
  const [error, setError] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const castLoad = async () => {
      try {
        setError(false);
        const casts = await fetchCast(movieId);
        setCastAll(casts.data.cast);
        console.log(casts);
      } catch (error) {
        setError(true);
      }
    };
    castLoad();
  }, [movieId, castAll, setError]);
  return (
    <div>
      {error && <Error />}
      <ul>
        {castAll.map((cast) => (
          <li key={cast.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
              alt={cast.name}
            />
            <h2>{cast.name}</h2>
            <p> Character: {cast.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

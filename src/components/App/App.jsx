import { Route, Routes } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import Loader from "../Loader/Loader";
import css from "./App.module.css";
import Navigation from "../Navigation/Navigation";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));

export default function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <header className={css.header}>
        <div>
          <Navigation />
        </div>
      </header>
      <main>
        <div className={css.container}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HomePage onLoading={setLoading} />} />
              <Route
                path="/movies"
                element={<MoviesPage onLoading={setLoading} />}
              />
              <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </>
  );
}

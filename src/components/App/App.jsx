import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navigation from "../Navigation/Navigation";
import HomePage from "../../pages/HomePage/HomePage";
import Loader from "../Loader/Loader";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";
import css from "./App.module.css";

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
          {loading && <Loader />}
          <Routes>
            <Route path="/" element={<HomePage onLoading={setLoading} />} />
            <Route
              path="/movies"
              element={<MoviesPage onLoading={setLoading} />}
            />
            <Route
              path="/movies/:movieId"
              element={<MovieDetailsPage onLoading={setLoading} />}
            >
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

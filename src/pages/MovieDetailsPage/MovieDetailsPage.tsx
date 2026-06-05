import { useEffect, useState } from "react";

import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import styles from "./MovieDetailsPage.module.css";

import { getMovieDetails, getImagePath } from "@/api";
import type { MovieDetails } from "@/types/movie";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const { movieId } = useParams<{ movieId: string }>();
  const location = useLocation();
  const backLinkHref = location.state ?? "/";
  const releaseYear = movie?.release_date.split("-")[0];
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movieId) return;
    const fetch = async () => {
      try {
        const data = await getMovieDetails(movieId);
        if (data) {
          setMovie(data);
        }
      } catch (error) {
        setError(getErrorMessage(error));
      }
    };
    fetch();
  }, [movieId]);
  return (
    movie &&
    !error.length && (
      <>
        <Link to={backLinkHref}>Go back</Link>
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            {movie && (
              <img
                src={getImagePath(movie.poster_path, 300)}
                alt={`${movie.original_title} image`}
              />
            )}
          </div>
          <div>
            <h1>
              {movie.original_title} ({releaseYear})
            </h1>
            <p>User score: {(movie.vote_average * 10).toFixed(0)}%</p>

            <section className="section">
              <h4>Overview</h4>
              <p> {movie.overview}</p>
            </section>
            <section className="section">
              <h4>Genres</h4>
              <ul>
                {movie.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
        <hr />
        <h4>Additional information</h4>
        <ul>
          <li>
            <NavLink to="cast" state={location.state}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={location.state}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <hr />
        <Outlet />
      </>
    )
  );
}

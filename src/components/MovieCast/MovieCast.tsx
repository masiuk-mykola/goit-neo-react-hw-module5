import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import styles from "./MovieCast.module.css";

import { getMovieCast, getImagePath } from "@/api";
import type { CastMember } from "@/types/movie";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function MovieCast() {
  const { movieId } = useParams<{ movieId: string }>();
  const [cast, setCast] = useState<CastMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movieId) return;
    const fetch = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieCast(movieId);

        setCast(data.cast);
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [movieId]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {cast.length && !isLoading && !error.length ? (
        <ul className={styles.list}>
          {cast.map((actor) => (
            <li key={actor.id}>
              <p>{actor.original_name}</p>
              <div>
                <img
                  src={
                    actor.profile_path
                      ? getImagePath(actor.profile_path, 200)
                      : "/no-image.webp"
                  }
                  alt={`Actor: ${actor.original_name}`}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getMovieReviews } from "@/api";
import type { Review } from "@/types/movie";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function MovieReviews() {
  const { movieId } = useParams<{ movieId: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movieId) return;
    const fetch = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieReviews(movieId);
        if (data) {
          setReviews(data.results);
        }
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
      {reviews.length && !isLoading && !error.length ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <section className="section">
                <h4>{review.author}</h4>
                <p>{review.content}</p>
              </section>
            </li>
          ))}
        </ul>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        "We don't have any reviews for this movie."
      )}
    </>
  );
}

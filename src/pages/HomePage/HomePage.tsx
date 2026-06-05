import { useEffect, useState } from "react";

import { getTrendingMovies } from "@/api";
import MovieList from "@/components/MovieList/MovieList";
import type { Movie } from "@/types/movie";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function HomePage() {
  const [trends, setTrends] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getTrendingMovies();
        if (data) {
          setTrends(data.results);
        }
      } catch (error) {
        setError(getErrorMessage(error));
      }
    };

    fetch();
  }, []);

  return trends.length && !error.length ? <MovieList movies={trends} /> : null;
}

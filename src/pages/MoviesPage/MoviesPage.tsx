import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { searchMovies } from "@/api";
import MovieList from "@/components/MovieList/MovieList";
import type { Movie } from "@/types/movie";
import { getErrorMessage } from "@/utils/getErrorMessage";

interface SearchFormElements extends HTMLFormControlsCollection {
  query: HTMLInputElement;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const query = searchParams.get("query");

    const fetch = async () => {
      if (!query) {
        setMovies([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await searchMovies(query);
        setMovies(data.results);
      } catch (e) {
        setError(getErrorMessage(e));
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [searchParams]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const elements = form.elements as SearchFormElements;
    const query = elements.query.value;

    if (!query.length) return;

    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("query", query);
    setSearchParams(updatedParams);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="query">
          <input type="text" name="query" id="query" />
        </label>
        <button type="submit">Search</button>
      </form>
      {isLoading && <div>Loading...</div>}
      {movies.length && !error.length && !isLoading ? (
        <MovieList movies={movies} />
      ) : null}
    </div>
  );
}

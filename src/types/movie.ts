export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
  overview?: string;
}

export interface MovieDetails {
  id: number;
  original_title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genres: Genre[];
}

export interface CastMember {
  id: number;
  original_name: string;
  profile_path: string | null;
}

export interface Credits {
  id: number;
  cast: CastMember[];
}

export interface Review {
  id: string;
  author: string;
  content: string;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

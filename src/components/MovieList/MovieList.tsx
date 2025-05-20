"use client";

import Link from "next/link";
import MovieCard from "@/components/MovieCard/MovieCard";

interface MovieListProps {
  movies: any[];
  from: string;
}

const MovieList: React.FC<MovieListProps> = ({ movies, from }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies?.map((movie) => (
        <Link
          key={movie.id}
          href={{
            pathname: `/movie/${movie.id}`,
            query: { from },
          }}
        >
          <MovieCard
            id={movie.id}
            title={movie.title}
            voteAverage={movie.vote_average}
            posterPath={movie.poster_path}
            releaseYear={new Date(movie.release_date).getFullYear()}
            description={movie.overview}
          />
        </Link>
      ))}
    </div>
  );
};

export default MovieList;


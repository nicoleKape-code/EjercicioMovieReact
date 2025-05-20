'use client';

import React, { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import MovieList from "@/components/MovieList/MovieList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const PopularClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const fetchPopularMovies = async (pageNumber: number) => {
      setLoading(true);
      try {
        const data = await getPopularMovies(pageNumber);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Error loading popular movies: ", err);
      }
      setLoading(false);
    };

    fetchPopularMovies(page);
  }, [page]);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Popular Movies</h3>
      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}
      <MovieList movies={movies} from="popular" />
      {/* Pagination Controls */}
      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage((prev) => Math.max(prev - 1, 1))} />
            </PaginationItem>
            {Array.from({ length: Math.min(5, totalPages - page + 1) }, (_, i) => i + page).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};


export default PopularClientPage;


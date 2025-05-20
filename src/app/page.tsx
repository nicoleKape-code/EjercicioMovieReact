'use client';

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import { getUpcomingMovies } from "@/services/movies/getUpcomingMovies";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const MainPageClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<any[]>([]);
  const [popular, setPopular] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [autoSlideIndex, setAutoSlideIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchMainMovies = async () => {
      setLoading(true);
      try {
        const [nowPlayingMovies, popularMovies, upcomingMovies] = await Promise.all([
          getNowPlayingMovies(),
          getPopularMovies(),
          getUpcomingMovies(),
        ]);
        setNowPlaying(nowPlayingMovies.results);
        setPopular(popularMovies.results);
        setUpcoming(upcomingMovies.results);
      } catch (err) {
        console.error("Error loading movies:", err);
      }
      setLoading(false);
    };

    fetchMainMovies();
  }, []);

  useEffect(() => {
    if (upcoming.length === 0) return;
    intervalRef.current = setInterval(() => {
      setAutoSlideIndex((prev) => (prev + 1) % upcoming.length);
    }, 3000);
    return () => clearInterval(intervalRef.current!);
  }, [upcoming]);

  const renderCarousel = (movies: any[], title: string) => (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent className="-ml-2">
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="basis-1/4 pl-2">
              <Link href={`/movie/${movie.id}`} className="block">
                <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{movie.overview}</p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );

  const renderAutoCarousel = (movies: any[], title: string) => (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent
          className="transition-transform duration-500"
          style={{ transform: `translateX(-${autoSlideIndex * 100}%)` }}
        >
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="basis-full flex justify-center">
              <div className="flex max-w-6xl w-full gap-8 items-center justify-center p-4">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-lg shadow object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{movie.title}</h3>
                  <p className="text-md text-gray-600">{movie.overview}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
  

  return (
    <div className="px-2">
      <h1 className="text-4xl font-bold mb-8">Welcome to MovieHub</h1>
      {renderAutoCarousel(upcoming, "Upcoming Movies")}
      {renderCarousel(nowPlaying, "Now Playing")}
      {renderCarousel(popular, "Popular Movies")}
    </div>
  );
};

export default MainPageClientPage;


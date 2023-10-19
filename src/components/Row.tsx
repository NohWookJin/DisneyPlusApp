import { useEffect, useState, useCallback } from "react";
import instance from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";

interface IRow {
  title: string;
  id: string;
  fetchUrl: string;
}

export interface IMovie {
  id: number;
  original_language: string;
  title: string;
  name: string;
  original_title: string;
  overview: string;
  video: boolean;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

const Row = ({ title, id, fetchUrl }: IRow) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [movieSelected, setMovieSelected] = useState<IMovie | null>(null);

  const refreshMovies = useCallback(async () => {
    const response = await instance.get(fetchUrl);
    setMovies(response.data.results);
  }, [fetchUrl]);

  const scrollLeft = () => {
    const element = document.getElementById(id);
    if (element) element.scrollLeft -= window.innerWidth - 80;
  };

  const scrollRight = () => {
    const element = document.getElementById(id);
    if (element) element.scrollLeft += window.innerWidth - 80;
  };

  const handleClick = (movie: IMovie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  useEffect(() => {
    refreshMovies();
  }, [refreshMovies]);

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span className="arrow" onClick={scrollLeft}>
            {"<"}
          </span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span className="arrow" onClick={scrollRight}>
            {">"}
          </span>
        </div>
      </div>
      {modalOpen && movieSelected && (
        <MovieModal movies={movieSelected} setModalOpen={setModalOpen} />
      )}
    </div>
  );
};

export default Row;

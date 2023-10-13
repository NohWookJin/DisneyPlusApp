import React, { useEffect, useState, useCallback } from "react";
import instance from "../api/axios";
import "./Row.css";

interface IRow {
  title: string;
  id: string;
  fetchUrl: string;
}

const Row = ({ title, id, fetchUrl }: IRow) => {
  const [movies, setMovies] = useState<any[]>([]);

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
              alt={movie.name}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span className="arrow" onClick={scrollRight}>
            {">"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Row;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMovie } from "../components/Row";
import instance from "../api/axios";

const DetailPage = () => {
  const { movieId } = useParams(); // const movieId = useParams().movieId

  const [movie, setMovie] = useState<IMovie | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await instance.get(`/movie/${movieId}`);
      setMovie(response.data);
    };

    fetchData();
  }, [movieId]);

  if (!movie) return null;

  return (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="img"
      />
    </section>
  );
};

export default DetailPage;

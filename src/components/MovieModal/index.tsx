import { useNavigate } from "react-router-dom";
import { IMovie } from "../Row";

import "./MovieModal.css";
import { useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

interface IModal {
  movies: IMovie;
  setModalOpen: any;
}

const MovieModal = ({ movies, setModalOpen }: IModal) => {
  const navigate = useNavigate();

  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>
          <img
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`}
            alt="modal-img"
          />
          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user_perc">100% for you</span>{" "}
              {movies.release_date}
            </p>
            <h2 className="modal__title">
              {movies.title ? movies.title : movies.name}
            </h2>
            <p className="modal__overview">평점: {movies.vote_average}</p>
            <p className="modal__overview">평점: {movies.overview}</p>
            <div
              onClick={() => navigate(`/movie/${movies.id}`)}
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              영화 상세 페이지 바로가기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;

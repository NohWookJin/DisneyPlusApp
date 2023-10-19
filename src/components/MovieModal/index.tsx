import { IMovie } from "../Row";

import "./MovieModal.css";

interface IModal {
  movies: IMovie;
  setModalOpen: any;
}

const MovieModal = ({ movies, setModalOpen }: IModal) => {
  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;

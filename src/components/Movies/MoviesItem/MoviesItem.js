import { useDispatch, useSelector } from "react-redux";

import { moviesActions } from "../../../store/reducers/movies";

import "./MoviesItem.css";

const MoviesItem = ({ movie }) => {
  const dispatch = useDispatch();

  const isLiked = useSelector((state) => state.movies.likes.includes(movie.id));
  const isDisliked = useSelector((state) =>
    state.movies.dislikes.includes(movie.id)
  );

  const deleteButtonHandler = () => {
    dispatch(moviesActions.deleteMovie(movie));
  };

  const likeHandler = () => {
    dispatch(moviesActions.likeMovie(movie.id));
  };

  const dislikeHandler = () => {
    dispatch(moviesActions.dislikeMovie(movie.id));
  };

  return (
    <div className="movie-item-container">
      <div className="movie-item-card">
        <h2 className="movie-item-title">{movie.title}</h2>
        <p className="movie-item-category">{movie.category}</p>
        <div className="movie-item-actions">
          <div className="movie-item-likes">
            <div className="likes-count">
              <div className="count">{movie.likes}</div>
              <div>
                <i
                  className={`fa-solid fa-thumbs-up ${isLiked && "active"}`}
                  onClick={likeHandler}
                ></i>
              </div>
            </div>
            <div className="deslikes-count">
              <div className="count">{movie.dislikes}</div>
              <div>
                <i
                  className={`fa-solid fa-thumbs-down ${
                    isDisliked && "active"
                  }`}
                  onClick={dislikeHandler}
                ></i>
              </div>
            </div>
          </div>
          <div>
            <button onClick={deleteButtonHandler} className="btn btn-danger">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesItem;

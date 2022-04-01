import { useDispatch, useSelector } from "react-redux";

import { moviesActions } from "../../store/reducers/movies";

const MovieItem = ({ movie }) => {
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
    <div className="movie-item">
      <div className="movie-card">
        <h2>{movie.title}</h2>
        <p>{movie.category}</p>
        <div className="actions">
          <div className="likes">
            <div className="like">
              <div className="count">{movie.likes}</div>
              <div>
                <i
                  className={`fa-solid fa-thumbs-up ${isLiked && "active"}`}
                  onClick={likeHandler}
                ></i>
              </div>
            </div>
            <div className="deslike">
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

export default MovieItem;

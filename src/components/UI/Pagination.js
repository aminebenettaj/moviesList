import { useDispatch, useSelector } from "react-redux";

import { moviesActions } from "../../store/reducers/movies";

const Pagination = ({ moviesLength }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.movies.currentPage);
  const currentRange = useSelector((state) => state.movies.currentRange);

  const nextPageHandler = () => {
    dispatch(moviesActions.changeCurrentPage(currentPage + 1));
  };

  const previousPageHandler = () => {
    dispatch(moviesActions.changeCurrentPage(currentPage - 1));
  };

  const changeCurrentPageHandler = (page) => {
    dispatch(moviesActions.changeCurrentPage(page));
  };

  const selectRangeHandler = (event) => {
    dispatch(moviesActions.changeCurrentRange(event.target.value));
  };

  const getPagesList = () => {
    const pages = [];
    const loopLength = Math.ceil(moviesLength / currentRange);
    for (let i = 1; i <= loopLength; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pagesList = getPagesList();

  return (
    <div className="pagination">
      {pagesList.length > 1 && (
        <div className="pages-list">
          <ul>
            <li>
              <button
                className="btn"
                onClick={previousPageHandler}
                disabled={currentPage === 1}
              >
                Précédent
              </button>
            </li>
            {pagesList.map((page) => (
              <li key={page}>
                <button
                  className={`btn ${page === currentPage && "btn-blue"}`}
                  onClick={() => changeCurrentPageHandler(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                className="btn"
                onClick={nextPageHandler}
                disabled={currentPage === pagesList[pagesList.length - 1]}
              >
                Suivant
              </button>
            </li>
          </ul>
        </div>
      )}
      <div class="range-select-container">
        <div>
          <label htmlFor="range-select">Films à afficher : </label>
          <select
            id="range-select"
            value={currentRange}
            onChange={selectRangeHandler}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

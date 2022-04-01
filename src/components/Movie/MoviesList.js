import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { moviesActions } from "../../store/reducers/movies";

import MovieItem from "./MovieItem";
import CategoriesFilter from "../UI/CategoriesFilter";
import Pagination from "../UI/Pagination";

import { movies$ as moviesJson } from "../../data/movies";

const MoviesList = () => {
  const dispatch = useDispatch();

  const moviesData = useSelector((state) => state.movies.list);

  const selectedCategories = useSelector(
    (state) => state.movies.selectedCategories
  );

  const currentPage = useSelector((state) => state.movies.currentPage);
  const currentRange = useSelector((state) => state.movies.currentRange);

  const [moviesByCategories, setMoviesByCategories] = useState([]);
  const [moviesToList, setMoviesToList] = useState([]);

  //On récupére les données et on initie le store redux
  useEffect(() => {
    moviesJson
      .then((response) => {
        dispatch(moviesActions.initializeMovies(response));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  //On refiltre les films a chaque fois que la liste a été modifié ou que les catégories selectionnées ont changé
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setMoviesByCategories(moviesData);
    } else {
      const selectedCategoriesValues = Object.keys(selectedCategories).map(
        (key) => selectedCategories[key].value
      );
      const filteredMovies = moviesData.filter((movie) => {
        return selectedCategoriesValues.includes(movie.category);
      });
      setMoviesByCategories(filteredMovies);
    }
  }, [moviesData, selectedCategories]);

  //On cherche les films a afficher pour la page actuelle
  useEffect(() => {
    const totallyFiltredMovies = moviesByCategories.slice(
      currentRange * (currentPage - 1),
      currentRange * currentPage
    );
    setMoviesToList(totallyFiltredMovies);
  }, [moviesByCategories, currentRange, currentPage]);

  return (
    <>
      <CategoriesFilter />
      <div className="movies-list">
        {moviesToList.map((movie) => {
          return <MovieItem key={movie.id} movie={movie} />;
        })}
      </div>
      <Pagination moviesLength={moviesByCategories.length} />
    </>
  );
};

export default MoviesList;

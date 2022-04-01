import { useDispatch, useSelector } from "react-redux";

import { moviesActions } from "../../store/reducers/movies";

import { MultiSelect } from "react-multi-select-component";

const CategoriesFilter = () => {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.list);
  const selectedCategories = useSelector(
    (state) => state.movies.selectedCategories
  );

  // On crée une liste de catégorie compatible avec le plugin de filtrage
  const formatCategoriesOptions = () => {
    const addedCategories = [];
    const categoriesOptions = [];
    movies.forEach((movie) => {
      if (!addedCategories.includes(movie.category)) {
        addedCategories.push(movie.category);
        categoriesOptions.push({
          label: movie.category,
          value: movie.category,
        });
      }
    });
    return categoriesOptions;
  };

  const changeSelectedCategoriesHandler = (categories) => {
    dispatch(moviesActions.changeSelectedCategories(categories));
  };

  return (
    <div className="categories-filter">
      <MultiSelect
        overrideStrings={{
          allItemsAreSelected: "Toutes les catégories sont sélectionnées",
          clearSearch: "Clear Search",
          clearSelected: "Clear Selected",
          noOptions: "No options",
          search: "Chercher",
          selectAll: "Selectionner tout",
          selectAllFiltered: "Selectionner tout",
          selectSomeItems: "Sélectionnez une catégorie",
        }}
        closeOnChangedValue
        className="categories-filter-select"
        options={formatCategoriesOptions()}
        value={selectedCategories}
        onChange={changeSelectedCategoriesHandler}
        labelledBy="Selectionnez une catégorie"
      />
    </div>
  );
};

export default CategoriesFilter;

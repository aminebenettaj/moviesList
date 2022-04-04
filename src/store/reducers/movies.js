import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    likes: [],
    dislikes: [],
    currentPage: 1,
    currentRange: 4,
    selectedCategories: [],
  },
  reducers: {
    initializeMovies(state, { payload: movies }) {
      return { ...state, list: movies };
    },
    deleteMovie(state, { payload: movieToDelete }) {
      const list = state.list.filter((movie) => movie.id !== movieToDelete.id);
      // Une fois le films supprimé, on virifi si il reste un film de la meme catégorie, si ce n'est le cas on supprime la catégorie de liste des catégories selectionnées
      const isStillThereAMovieOfTheDeletedMovieCategory = list.filter(
        (movie) => movie.category === movieToDelete.category
      );
      if (isStillThereAMovieOfTheDeletedMovieCategory.length === 0) {
        const selectedCategories = state.selectedCategories.filter(
          (category) => category.label !== movieToDelete.category
        );
        return { ...state, selectedCategories, list };
      }
      return { ...state, list };
    },
    likeMovie(state, { payload: movieId }) {
      //Si on a déjà liké, on enlève le like
      if (state.likes.includes(movieId)) {
        const likes = state.likes.filter((id) => id !== movieId);
        const list = state.list.map((movie) => {
          if (movie.id === movieId) {
            const updatedMovie = { ...movie };
            updatedMovie.likes--;
            return updatedMovie;
          }
          return movie;
        });
        return { ...state, likes, list };
      } else {
        const likes = [...state.likes];
        likes.push(movieId);
        let dislikes = [...state.dislikes];
        //On vérifi qu'on a pas déjà disliker le film, si c'est le cas alors on enlève le dislike tout en ajoutant le like
        const list = state.list.map((movie) => {
          if (movie.id === movieId) {
            const updatedMovie = { ...movie };
            updatedMovie.likes++;
            if (dislikes.includes(movieId)) {
              updatedMovie.dislikes--;
              dislikes = dislikes.filter((id) => id !== movieId);
            }
            return updatedMovie;
          }
          return movie;
        });
        return { ...state, list, likes, dislikes };
      }
    },
    dislikeMovie(state, { payload: movieId }) {
      if (state.dislikes.includes(movieId)) {
        const dislikes = state.dislikes.filter((id) => id !== movieId);
        const list = state.list.map((movie) => {
          if (movie.id === movieId) {
            const updatedMovie = { ...movie };
            updatedMovie.dislikes--;
            return updatedMovie;
          }
          return movie;
        });
        return { ...state, dislikes, list };
      } else {
        const dislikes = [...state.dislikes];
        dislikes.push(movieId);
        let likes = [...state.likes];
        const list = state.list.map((movie) => {
          if (movie.id === movieId) {
            const updatedMovie = { ...movie };
            updatedMovie.dislikes++;
            if (likes.includes(movieId)) {
              updatedMovie.likes--;
              likes = likes.filter((id) => id !== movieId);
            }
            return updatedMovie;
          }
          return movie;
        });
        return { ...state, list, dislikes, likes };
      }
    },
    changeSelectedCategories(state, { payload: selectedCategories }) {
      return { ...state, currentPage: 1, selectedCategories };
    },
    changeCurrentPage(state, { payload: currentPage }) {
      return { ...state, currentPage };
    },
    changeCurrentRange(state, { payload: currentRange }) {
      return { ...state, currentPage: 1, currentRange };
    },
  },
});

export const moviesActions = moviesSlice.actions;

export default moviesSlice.reducer;

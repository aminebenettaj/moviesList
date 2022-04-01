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
      const isStillThereAMovieOfTheDeletedMovieCategory = list.filter(
        (movie) => movie.category === movieToDelete.category
      );
      const selectedCategories =
        isStillThereAMovieOfTheDeletedMovieCategory.length === 0
          ? state.selectedCategories.filter(
              (category) => category.label !== movieToDelete.category
            )
          : [...state.selectedCategories];
      return { ...state, selectedCategories, list };
    },
    likeMovie(state, { payload: movieId }) {
      if (state.likes.includes(movieId)) {
        const likes = state.likes.filter((id) => id !== movieId);
        const list = state.list.map((movie) => {
          if (movie.id === movieId) {
            const updatedMovie = { ...movie, likes: movie.likes - 1 };
            return updatedMovie;
          }
          return movie;
        });
        return { ...state, likes, list };
      } else {
        const likes = [...state.likes, movieId];
        let dislikes = [...state.dislikes];
        const list = state.list.map((movie) => {
          if (movie.id === movieId) {
            const updatedMovie = { ...movie, likes: movie.likes + 1 };
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
            const updatedMovie = { ...movie, dislikes: movie.dislikes - 1 };
            return updatedMovie;
          }
          return movie;
        });
        return { ...state, dislikes, list };
      } else {
        const dislikes = [...state.dislikes, movieId];
        let likes = [...state.likes];
        const list = state.list.map((movie) => {
          if (movie.id === movieId) {
            const updatedMovie = { ...movie, dislikes: movie.dislikes + 1 };
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

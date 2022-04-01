import { Provider } from "react-redux";

import store from "./store";

import "./App.css";

import MoviesList from "./components/Movie/MoviesList";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <main>
        <MoviesList />
      </main>
    </Provider>
  );
};

export default App;

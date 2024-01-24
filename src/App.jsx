import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Main from "./pages/Main";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/:category/:id" element={<Movie />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search/:category/:page" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

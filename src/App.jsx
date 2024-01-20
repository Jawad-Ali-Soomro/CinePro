import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/movie/:id" element={<Movie />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

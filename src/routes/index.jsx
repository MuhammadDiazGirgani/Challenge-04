import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../views/home';
import MovieDetails from '../views/MovieDetails';


function RoutesIndex() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />

    </Routes>
  );
}

export default RoutesIndex;

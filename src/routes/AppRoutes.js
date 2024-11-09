import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Popular from '../pages/Popular';
import SearchPage from '../pages/SearchPage';
import Wishlist from '../pages/Wishlist';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  );
};

export default AppRoutes;

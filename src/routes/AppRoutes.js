import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Popular from '../pages/Popular';
import SearchPage from '../pages/SearchPage'; // 파일 경로 확인
import Wishlist from '../pages/Wishlist';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<Popular />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  );
};

export default AppRoutes;

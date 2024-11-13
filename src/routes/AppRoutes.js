import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Popular from '../pages/Popular';
import SearchPage from '../pages/SearchPage';
import Wishlist from '../pages/Wishlist';
import Login from '../pages/Login'; // Login 컴포넌트 import
import Register from '../pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;

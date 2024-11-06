import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from '../pages/Home.jsx';
import Popular from '../pages/Popular.jsx';
import Search from '../pages/Search.jsx';
import Wishlist from '../pages/Wishlist.jsx';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/search" element={<Search />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
};

export default App;

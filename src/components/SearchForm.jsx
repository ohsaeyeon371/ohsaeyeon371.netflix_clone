import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [language, setLanguage] = useState('');

  const genreOptions = {
    '장르 (전체)': '',
    'Action': 28,
    'Adventure': 12,
    'Comedy': 35,
    'Crime': 80,
    'Family': 10751,
  };

  const ratingOptions = {
    '평점 (전체)': '',
    '9~10': '9',
    '8~9': '8',
    '7~8': '7',
    '6~7': '6',
    '5~6': '5',
  };

  const languageOptions = {
    '언어 (전체)': '',
    '영어': 'en',
    '한국어': 'ko',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(genre, rating, language);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <select onChange={(e) => setGenre(genreOptions[e.target.value])}>
        {Object.keys(genreOptions).map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
      <select onChange={(e) => setRating(ratingOptions[e.target.value])}>
        {Object.keys(ratingOptions).map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
      <select onChange={(e) => setLanguage(languageOptions[e.target.value])}>
        {Object.keys(languageOptions).map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
      <button type="submit">검색</button>
    </form>
  );
};

export default SearchForm;

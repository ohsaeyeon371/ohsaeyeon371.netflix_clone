import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const MovieSearch = ({ changeOptions }) => {
  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    changeOptions({ [name]: value });
  };

  return (
    <SearchContainer>
      <Select name="originalLanguage" onChange={handleOptionChange}>
        <option value="장르 (전체)">장르 (전체)</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Comedy">Comedy</option>
        <option value="Crime">Crime</option>
        <option value="Family">Family</option>
      </Select>
      <Select name="translationLanguage" onChange={handleOptionChange}>
        <option value="평점 (전체)">평점 (전체)</option>
        <option value="9~10">9~10</option>
        <option value="8~9">8~9</option>
        <option value="7~8">7~8</option>
        <option value="6~7">6~7</option>
        <option value="5~6">5~6</option>
        <option value="4~5">4~5</option>
        <option value="4점 이하">4점 이하</option>
      </Select>
      <Select name="sorting" onChange={handleOptionChange}>
        <option value="언어 (전체)">언어 (전체)</option>
        <option value="영어">영어</option>
        <option value="한국어">한국어</option>
      </Select>
    </SearchContainer>
  );
};

export default MovieSearch;

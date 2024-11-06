import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ScrollContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

const MovieCard = styled.div`
  width: 200px;
  cursor: pointer;
  text-align: center;

  img {
    width: 100%;
    border-radius: 8px;
    transition: transform 0.3s;
  }

  img:hover {
    transform: scale(1.05);
  }

  h4 {
    margin-top: 10px;
    font-size: 1rem;
  }
`;

const MovieInfiniteScroll = ({ apiKey, genreCode, sortingOrder, voteEverage }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
          params: {
            api_key: apiKey,
            with_genres: genreCode,
            sort_by: sortingOrder,
            'vote_average.gte': voteEverage,
            page,
          },
        });
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [apiKey, genreCode, sortingOrder, voteEverage, page]);

  const handleScroll = (e) => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollContainer>
      {movies.map((movie, index) => (
        <MovieCard key={index}>
          <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
          <h4>{movie.title}</h4>
        </MovieCard>
      ))}
    </ScrollContainer>
  );
};

export default MovieInfiniteScroll;

import React, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

function App() {
  const API_URL = 'http://www.omdbapi.com?i=tt3896198&apikey=250834c2';
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  console.log();
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    console.log(data.Search);
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies('');
  }, []);

  return (
    <div className='app'>
      <h1>Movie-App</h1>
 
      <div className='search'>
        <input
          type='text'
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movie found</h2>
        </div>
      )}
    </div>
  );
}

export default App;

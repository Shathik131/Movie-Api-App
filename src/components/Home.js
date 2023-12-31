import React, { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "../components/MovieCard";
import axios from "axios";

const Home = () => {
  const API_URL = "http://www.omdbapi.com?i=tt3896198&apikey=250834c2";
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    await axios
      .get(`${API_URL}&s=${title}`)
      .then((res) => {
        // console.log(res.data)
        setMovies(res.data.Search);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    searchMovies("");
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
};

export default Home;

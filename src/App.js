import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

import './App.css';
import SearchIcon from './search.svg';
//993b908a

const API_URL = 'http://omdbapi.com?apikey=993b908a'

const movie1 = {
    "Poster" : "https://m.media-amazon.com/images/M/MV5BNzY2ZDQ2MTctYzlhOC00MWJhLTgxMmItMDgzNDQwMDdhOWI2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg",
    "Title" : "Superman Returns",
    "Type" : "movie",
    "Year" : "2006", 
    "imdbID" : "tt0348150"}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Superman');

    }, []);
    return (
        <div>
            <h1>Movie Land</h1>
        <div className="search">
            <input 
                placeholder="Search for movies"
                value = {searchTerm}
                onChange= {(e) => setSearchTerm(e.target.value)} 
            />
            <img 
                src={SearchIcon}
                alt = "search"
                onClick = {() => searchMovies(searchTerm)}
            />
        </div>
        {
            movies?.length > 0
            ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </div>
            ) : (
                <div className="empty" >
                    <h2>No Movies found</h2>
                </div>
            )
        }
        </div>
    );
}

export default App;
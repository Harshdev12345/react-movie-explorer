import React, { useState } from "react";
import "./App.css";

const API_KEY = "a6f22c18";

function App() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  async function searchMovies() {

    if(search.trim() === "") return;

    setMovies([]);

    const res = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`
    );

    const data = await res.json();

    if(data.Search){
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  }

  return (
    <div className="container">

      <h1>🎬 Movie Explorer</h1>

      <div className="searchBox">

        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              searchMovies();
            }
          }}
          placeholder="Search movie..."
        />

        <button onClick={searchMovies}>
          Search
        </button>

      </div>

      <div className="movies">

        {movies.map(movie => (

          <div className="card" key={movie.imdbID}>

            <img
              src={
                movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/200"
              }
              alt={movie.Title}
            />

            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react'
import axios from 'axios';


const Movie = () => {
  const api_key = process.env.REACT_APP_APIKEY;
  const [movies, setMovie] = useState([]);



  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          "https://tmdb-movies-and-tv-shows-api-by-apirobots.p.rapidapi.com/v1/tmdb?name=robot&page=1",
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': api_key,
              'x-rapidapi-host': 'tmdb-movies-and-tv-shows-api-by-apirobots.p.rapidapi.com'
            },
          }
        );

        console.log("API Response:", response.data);
       if (response.data && response.data.result) {
        setMovie(response.data.result);
        } else {
         setMovie([]);
       }
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };
    fetchMovie();
  }, [ api_key ]);


  
  return (
    <>
    <div className="container">
    <form className="d-flex justify-content-center">
      <input type="text" 
      className="form-control me-2 mt-5" 
      placeholder="Search for a movie" 
      style={{width: '800px'}}
      aria-label="Search" />
      <button variant="outline-dark" className="rounded mt-5" 
      type="submit">Search</button>
    </form>
    </div>

    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div class="card">
            {movies.length > 0 ? (
              movies.map((movie) => (
              <div key={movie.id}>
              <h1>{movie.title}</h1>
              <p>{movie.overview}</p>
              <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde explicabo enim rem odio assumenda?
              </p>
              </div>
              ))
            ) : (
              <h1>No movie found</h1>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Movie;
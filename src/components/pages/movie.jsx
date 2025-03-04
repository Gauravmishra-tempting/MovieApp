import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const Movie = () => {
  const api_key = process.env.REACT_APP_APIKEY;
  const [movies, setMovie] = useState([]);



  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          "https://imdb236.p.rapidapi.com/imdb/top250-movies",
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': api_key,
              'x-rapidapi-host': 'imdb236.p.rapidapi.com'
            },
          }
        );

        console.log("API Response:", response.data);
       if (response.data && response.data) {
        setMovie(response.data);
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
            {movies.length > 0 ? (
              movies.map((movie) => (
        <div className="col" key={movie.id}>
           <Card className="mb-5 shadow-lg" style={{ width: '18rem', height: '95%', display: 'flex', flexDirection: 'column' }}>
              <Card.Img variant="top" src={movie.primaryImage}  />
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">{movie.startYear}</Card.Subtitle>
                <Card.Title>{movie.primaryTitle}</Card.Title>
                <Card.Text>
                   {movie.description}
                </Card.Text>
                <Card.Subtitle className='mb-3 text-muted'>Rating : ⭐ {movie.averageRating} / 10</Card.Subtitle>
                <Card.Subtitle className='mb-3 text-muted'>RunTime : {movie.runtimeMinutes} min</Card.Subtitle>
                <Button href={movie.url} variant="primary">View on IMDb</Button>
              </Card.Body>
            </Card>
            </div>
              ))
            ) : (
              <h1>No movie found</h1>
            )}
          </div>
    </div>
    </>
  )
}

export default Movie;
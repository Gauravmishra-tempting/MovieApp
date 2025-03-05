import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';



const Movie = () => {
  const api_key = process.env.REACT_APP_APIKEY;
  const [movies, setMovie] = useState([]);
  const [serachMovie, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;
  


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

  

  const filteredMovies = movies.filter((movie) => 
    movie.primaryTitle?.toLowerCase().includes(serachMovie.toLowerCase())
  );

 // Pagination Logic
 const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
 const indexOfLastMovie = currentPage * moviesPerPage;
 const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
 const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

 // Pagination Handlers
 const nextPage = () => {
   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
 };

 const prevPage = () => {
   if (currentPage > 1) setCurrentPage(currentPage - 1);
 };


 

  
  return (
    <>
    <div className="container">
    <form className="d-flex justify-content-center">
      <input type="text" 
      className="form-control me-2 mt-5" 
      placeholder="Search for a movie" 
      style={{width: '800px'}}
      value={serachMovie}
      aria-label="Search"
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
     />
      <button variant="outline-dark"
       className="rounded mt-5" 
      type="submit"
      onClick={(e) => e.preventDefault()}
      >
        Search
      </button>
    </form>
    </div>

    <div className="container mt-5">
      <div className="row">
            {currentMovies.length > 0 ? (
              currentMovies.map((movie) => (
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
              <h1></h1>
            )}
          </div>
    </div>

     {/* Pagination */}
     <div className='container'>
     <Pagination className="d-flex justify-content-center mt-4">
          <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
          <Pagination.Next onClick={nextPage} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
        </div>

    </>
  )
}

export default Movie;
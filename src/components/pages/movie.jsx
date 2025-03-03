import React from 'react'


const movie = () => {
  const api_key = process.env.REACT_APP_APIKEY;




  
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
              <h1>HOVER ME</h1>
              <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde explicabo enim rem odio assumenda?
              </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default movie;
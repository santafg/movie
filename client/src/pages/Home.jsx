import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [movies, setmovies] = useState([]);

  const getMovies = async () => {
    try {
      const res = await axios.get("/getallmovies");
      setmovies(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);

  console.log(movies);

  const deleteMovie = async (id) => {
      try {
          await axios.delete(`/deleteamovie/${id}`);
          getMovies();
          
      } catch (error) {
          console.log(error);
      }
  }

  return (
    <>
      <div className="homeContainer">
        <div className="homeBox">
          <div className="head">
            <h1>Movie List</h1>
            <div className="btn">
              <h2>Add a movie : </h2>
            <Link to="/add">
              <button>+</button>
            </Link>
            </div>
          </div>
          <div className="body">
            {movies.length <= 0 ? (<>
            <div className='load'>
              <div className="loader"></div>
            </div>
            </>):(<>
            <div className="cardsDiv">
              {movies.map((movie) => {
                return (
                  <div className="card" key={movie._id}>
                    <div className="info">
                      <h1>{movie.MovieName}</h1>
                      <h3>Language : {movie.Language}</h3>
                      <h3>Release Date : {movie.ReleaseDate.slice(0,10).split('-').reverse().join('/')}</h3>
                      <div className="money">
                        <h5>Budget : {movie.Budget}</h5>
                        <h5>Collection : {movie.Collection}</h5>
                      </div>
                    </div>
                    <div className="btns">
                      <Link to={`/update/${movie._id}`}>
                        <button className='update'>Update</button>
                      </Link>
                      <button className='delete' onClick={()=>deleteMovie(movie._id)} >Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            </>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

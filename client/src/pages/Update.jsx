import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, Link , useParams } from "react-router-dom";

const Update = () => {
    const {id} = useParams();
    // console.log(id);
  const history = useHistory();
  const [movie, setmovie] = useState({
    MovieName: "",
    Language: "",
    ReleaseDate: "",
    Budget: "",
    Collection: "",
  });

  const inputEvent = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setmovie({ ...movie, [name]: value });
  };

  const getMovie = async () => {
    try {
      const res = await axios.get(`/getamovie/${id}`)
      // console.log(res.data);
      setmovie(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMovie()
  }, [])


  const updateMovie = async () => {
    try {
      const { MovieName, Language, ReleaseDate, Budget, Collection } = movie;
      if (!MovieName || !Language || !ReleaseDate || !Budget || !Collection) {
        alert("Fill all the fields");
      } else {
        const res = await axios.put(`/updateamovie/${id}`, {
          MovieName,
          Language,
          ReleaseDate,
          Budget,
          Collection,
        });
        if (res) {
          history.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="addContainer">
        <div className="addBox">
          <div className="head">
            <h1>Update a Movie</h1>
          </div>
          <div className="body">
            <div className="formDiv">
              <label htmlFor="name">
                <h2>Movie Name :</h2>
                <input
                  type="text"
                  onChange={inputEvent}
                  name="MovieName"
                  value={movie.MovieName}
                />
              </label>
              <label htmlFor="language">
                <h2>Language :</h2>

                <input
                  type="text"
                  onChange={inputEvent}
                  name="Language"
                  value={movie.Language}
                />
              </label>
              <label htmlFor="date">
                <h2>Release Date :</h2>

                <input id='date'
                  type="date"
                  onChange={inputEvent}
                  name="ReleaseDate"
                  value={movie.ReleaseDate}
                />
              </label>
              <label htmlFor="budget">
                <h2>Budget :</h2>
                <input
                  type="number"
                  onChange={inputEvent}
                  name="Budget"
                  value={movie.Budget}
                />
              </label>
              <label htmlFor="collections">
                <h2>Collection :</h2>
                <input
                  type="number"
                  onChange={inputEvent}
                  name="Collection"
                  value={movie.Collection}
                />
              </label>
            </div>
              <div className="btn">
                <button className='submit' onClick={() => updateMovie()}>Update</button>
                <Link to="/">
                  <button className='home'>Home</button>
                </Link>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;

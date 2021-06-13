const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

port = process.env.PORT || 4000;

app.listen(port, () => console.log(`app running at http://localhost:${port}`));


  // Porduction version
  if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
};

// mongoDB connection

const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify : false
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));


// Routes

const Movielist = require("./models/movielist");

// get all movies

app.get("/getallmovies", async (req, res) => {
  try {
    const movies = await Movielist.find();
    res.status(200).send(movies);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get a movies

app.get("/getamovie/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const movie = await Movielist.findById({_id});
    res.status(200).send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

// post a movie

app.post("/addamovie", async (req, res) => {
  try {
    const newMovie = new Movielist(req.body);
     await newMovie.save();
    res.status(200).send("Movie Added");
  } catch (error) {
    res.status(400).send(error);
  }
});

// update a movie

app.put('/updateamovie/:id' , async(req , res)=>{
    try {
        const _id = req.params.id;
        await Movielist.findByIdAndUpdate({_id} , req.body , {new : true});
        res.status(200).send("Movie Updated");
        
    } catch (error) {
        res.status(500).send(error);
    }
})

// delete a movie

app.delete('/deleteamovie/:id' , async(req , res)=>{
    try {
        const _id = req.params.id;
        await Movielist.findByIdAndDelete({_id});
        res.status(200).send("Movie Deleted");
        
    } catch (error) {
        res.status(500).send(error);
    }
})

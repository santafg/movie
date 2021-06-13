const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    MovieName: String,
	Language:String,
	ReleaseDate:Date,
	Budget: Number,
	Collection: Number
})

const Movielist = mongoose.model('Movielist' , movieSchema);

module.exports = Movielist;
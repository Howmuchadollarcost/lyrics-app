const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    artistName : String,
    songName : String,
    album: String,
    year: Number,
    imgSrc: String,
    link: String,
    content: String,
    created_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Song', SongSchema);

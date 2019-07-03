const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Song = require('../models/Song');

const data = [{
        id: 1,
        artistName: 'Teddy Afro',
        songName: 'Lambadina',
        album: 'Yasteseryal',
        year: 2005,
        imgSrc: "../assets/teddy1.jpg",
        link: "lambadina",
        content: ''
    },
    {
        id: 2,
        artistName: 'Aster Aweke',
        songName: 'ጨጨሆ (checheho)',
        album: 'Yasteseryal',
        year: 2011,
        imgSrc: "../assets/Aster1.jpg",
        link: "checheho",
        content: ''
    }
];

// Read all songs
router.get('/', (req, res) => {
    Song.find({}, (err, songs) => {
        if (err) {
            console.log("Error: ", err);
        }
        console.log(songs);
    })

    res.render('indexPage', {
        data: data
    })
});

// Read a single song
router.get('/songs/:id', (req, res) => {
    Song.findOne({
        song: req.params.id
    }).exec((err, singleSong) => {
        if (err) {
            console.log("Error: ", err)
        } else {
            res.send({
                singleSong: singleSong
            })
        }
    })



    const song = data.filter((item) => {
        return item.link == req.params.id;
    })[0];

    console.log(song);

    res.render("songPage", {
        artistName: song.artistName,
        songName: song.songName,
        imgSrc: song.imgSrc,
        year: song.year
    })
});

//Create A Song
router.post('/song', (req, res) => {
    if (!req.body.content && !req.body.songName) {
        return res.status(400).send({
            message: "Song content cannot be empty"
        })
    }

    //create song
    const song = new Song({
        artistName: req.body.artistName || "Unknown",
        songName: req.body.songName,
        album: req.body.album,
        year: req.body.year || 'N/A',
        imgSrc: req.body.imgSrc,
        link: req.body.link,
        content: req.body.content
    })


    //save song to Database
    song.save((err) => {
        if (err) {
            console.log(err);
            res.send("Somthing wrong happened while saving into the DB");
        } else {
            console.log("Song Save to DB!!!")
            res.send(song);
        }
    });
});

module.exports = router;
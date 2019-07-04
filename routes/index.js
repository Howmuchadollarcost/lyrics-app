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
        res.render('indexPage', {
            data: songs
        })
    })

    // res.render('indexPage', {
    //     data: data
    // })
});

//Send all songs in JSON
router.get('/songs', (req, res) => {
    Song.find({}, (err, songs) => {
        if (err) {
            console.log("Error: ", err);
        }
        res.send(songs)
    })
});


// Read a single song
router.get('/songs/:id', (req, res) => {
    Song.findOne({
        _id: req.params.id
    }, (err, singleSong) => {
        if (err) {
            console.log("Error", err)
        }
        res.render("songPage", {
            artistName: singleSong.artistName,
            songName: singleSong.songName,
            imgSrc: singleSong.imgSrc,
            year: singleSong.year,
            content: singleSong.content
        })
    })


    // const song = data.filter((item) => {
    //     return item.link == req.params.id;
    // })[0];

    // res.render("songPage", {
    //     artistName: song.artistName,
    //     songName: song.songName,
    //     imgSrc: song.imgSrc,
    //     year: song.year
    // })
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
            res.send("Something wrong happened while saving into the DB");
        } else {
            console.log("Song Save to DB!!!")
            res.send(song);
        }
    });
});


// Delete Entry
router.delete('/songs/:id', (req, res) => {
    Song.remove({
        song: req.params.id
    }), (err) => {
        if (err) {
            console.log("Something happend while deleting ", err)
        } else {
            console.log('Song deleted')
            res.redirect('/');
        }
    }
})


module.exports = router;
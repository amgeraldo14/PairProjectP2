const Song = require("../models/index.js").Song;
const User = require("../models/index.js").User

class SongController {
  static formAddSong(req, res) {
    res.render("formAddSong");
  }
  static postAdd(req, res) {
    let newSong = {
      title: req.body.title,
      artist: req.body.artist,
    };
    Song.create(newSong)
      .then((data) => {
        res.redirect("/songs");
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
  static showList(req, res) {
    Song.findAll()
      .then((data) => {
        res.render("showSongs", { songs: data });
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
  static deleteSong(req, res){
    let searchId = req.params.id
    Song.destroy({
      where: {id : searchId}
    })
    .then(data => {
      res.redirect('/songs')
    })
    .catch(err => {
      res.send(err.message)
    })
  }
  static showFollowers(req, res){
    Song.findOne({
      where: { id : req.params.id},
      include: [User]
    })
    .then(data => {
      res.render('showSongsFollowers', {followers : data})
    })
    .catch(err => {
      res.send(err.message)
    })
  }
}

module.exports = SongController;

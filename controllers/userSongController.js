const UserSong = require('../models/index.js').UserSong


class UserSongController{
  static follow(req, res){
    let obj = {
      user_id : req.session.userId,
      song_id : req.params.id
    }
    UserSong.create(obj)
    .then(data => {
      res.redirect('/songs')
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = UserSongController
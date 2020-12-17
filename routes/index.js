const router = require('express').Router()
const UserController = require('../controllers/userController.js')
const SongController = require('../controllers/songController.js')
const UserSongController = require('../controllers/userSongController')

function isLogin(req, res, next){
  if(req.session.email){
    next()
  } else {
    res.send('login dulu woiii <br> <a href="/users/login">Login</a>')
  }
}

router.get('/', UserController.showHome)

router.get('/users/login', UserController.showLoginForm)
router.post('/users/login', UserController.userLogin)


router.get('/users/register', UserController.formRegister)
router.post('/users/register', UserController.registerUser)


// router.get('/users/delete/:id', (req,res) =>{
  //   res.send('ini /users/delete/:id buat nampilin users')
  // })
  
  router.use(isLogin)
  
  router.get('/home', (req, res) => {
    // console.log(req.session, 'ini console log setelah login')
    res.render('home')
  })
  
router.get('/users', UserController.showBio)
router.get('/users/see-follow', UserController.seeFollow) //songs that you followed

router.get('/users/logout', UserController.userLogout)

router.get('/songs', SongController.showList)

router.get('/songs/follow/:id', UserSongController.follow)
router.get('/songs/showSongFollowers/:id', SongController.showFollowers)

router.get('/feedback', UserController.feedbackForm)
router.post('/feedback', UserController.sendFeedback)


// router.get('/songs/delete/:id', SongController.deleteSong)
// router.get('/songs/add', SongController.formAddSong)
// router.post('/songs/add', SongController.postAdd)

module.exports = router
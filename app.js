const port = 3000
const express = require ('express')
const app = express()
const router = require('./routes/index.js')
const session = require('express-session')

app.use(session({
  secret: 'terserah',
  resave: false,
  saveUninitialized: false,
  cookie: { secure : false }
}))


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))

app.use('/', router)

app.listen(port, () => {
  console.log('listening on port', port)
})
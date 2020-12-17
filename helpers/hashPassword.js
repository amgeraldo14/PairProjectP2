const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

function hashPassword(password){
  let a = bcrypt.hashSync(password, salt)
  return a
}

function comparePassword(password, hashPassword){
  let b = bcrypt.compareSync(password, hashPassword)
  return b
}


module.exports = { hashPassword, comparePassword }
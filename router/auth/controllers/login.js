const bcrypt = require('bcryptjs')
// const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const { privatKey } = require('../../../config/index')

module.exports = (req, res) => {
  const { email, password } = req.body
  db.Users.findOne({email}).exec((error, user) => {
    if (error) return res.status(500).send({msg: "Server ERROR: Status 500.9, DB ERROR!"})
    if (!user) return res.status(404).send({msg: "User not found"})
    if (email !== user.email) return res.status(400).send({msg: "Invalid email."})
    bcrypt.compare(password, user.password, (err, passwordMatch) => {
      console.error(err);
      if (err) return res.status(500).send({ msg: "Server ERROR: 500.15, CRIPT ERROR", err })
      if (!passwordMatch) return res.status(401).send({msg: "Вы ввели неверный пароль. Попробуйте еще раз!"})
    //   const refreshToken = uuid()
      const bodyToken = {
        _id: user._id
      }
      jwt.sign(bodyToken, privatKey, (err, token) => {
        if (err) return res.status(500).send({ msg: "Server ERROR: 500.23, JWT ERROR", err }) 
        res 
            // .cookie('refresh', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 3 })
            .status(200)
            .send({ msg: `Добро пожаловать ${user.name}`, token })
      })
    })
  })
}
const bcryptjs = require('bcryptjs')
const uuid = require('uuid')
const sender = require('../../../plugins/sendEmail')
const keyForVerify = uuid.v1()
const link = `http://localhost:3000/verify/${keyForVerify}`


module.exports = (req, res) => {
    const { email, password, name } = req.body
    db.Users.findOne({email}, (error, vUser) => {
        if (error) res.status(500).send({msg: "Ошибка сервера. Возможно кодер x_x"})
        if (vUser) return res.status(401).send({msg: `Добрый день ${vUser.name}. Это вы? Вы уже зарегестрированны. Попробуйте авторезироватся!`})  
        db.UnUsers.findOne({email}, (error, user) => {
            if (error) res.status(500).send({msg: "Ошибка сервера. Возможно кодер x_x"})
            if (user) return res.status(401).send({msg: `Добрый день ${user.name}. Это вы? Вам было отправленно письмо на почту. Проверте!`})  
            bcryptjs.genSalt(10, (error, salt) => {
            if (error) return res.status(500).send({msg: 'Ошибка сервера. Возможно кодер x_x', error})
                bcryptjs.hash(password, salt, (error, hash) => {
                    if (error) return res.status(500).send({msg: 'Ошибка сервера. Возможно кодер x_x(', error})
                    db.UnUsers.create({...req.body, password: hash, key: keyForVerify}, error => {
                        if (error)  return res.status(500).send({e})
                        // sender(email, link)
                        res.send({ msg: `Рады вас видеть ${name}, проверьти почту для верефикации! `})
                    })
                })
            })
        })

    })
}
const bcryptjs = require('bcryptjs')

module.exports = (req, res) => {
    const { email, password, name, avatar, fbID } = req.body
    db.Users.findOne({email}, (error, user) => {
        if (error) return res.status(500).send({msg: "E:6 Ошибка сервера. Возможно кодер x_x"})
        if (user) return res.status(401).send({msg: `Опять сбой! Этого сообщения не должно быть! )_(`})  
        bcryptjs.genSalt(10, (error, salt) => {
        if (error) return res.status(500).send({msg: 'E:9 Ошибка сервера. Возможно кодер x_x', error})
            bcryptjs.hash(password, salt, (error, hash) => {
                if (error) return res.status(500).send({msg: 'E:11 Ошибка сервера. Возможно кодер x_x(', error})
                db.Users.create({...req.body, password: hash}, (error, createdUser) => {
                    db.UnUsers.findOne({email}).remove().exec()
                    if (error)  return res.status(500).send({error})
                    return res.send({ msg: `Регистрация нового аккаунта успешна. Добро пожаловать ${name}! `, user: createdUser})
                })
            })
        })
    })
}
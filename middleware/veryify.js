const jwt = require('jsonwebtoken')
const { privatKey } = require('../config/index')

module.exports = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).send({msg: "Нет токена"})
    let token = req.headers.authorization.split(' ')[1]
    if (token === "undefined" || token === "null") return res.status(401).send({msg: "Авторезируйтесь для продолжения работы"})
    db.Users.findOne({fbToken: token}, (error, user) => {
        if (error) return res.status(500).send({msg: "Ошибка сервера. Возможно кодер x_x"})
        if (user) {
            req.userID = user._id
            return next()
        }
        let payload = jwt.verify(token, privatKey)
        if (!payload) return res.status(401).send({msg: "Неверный токен"})
        req.userID = payload._id
        let findedUser = db.Users.findOne({ _id: payload._id})
        if (!findedUser) return res.status(401).send({msg: "Данного ююзера не существует =("})
        next()
    })
}
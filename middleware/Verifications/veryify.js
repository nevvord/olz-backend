const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).send({msg: "Нет токена"})
    const token = req.headers.authorization.split(' ')[1]
    if (token === "undefined" || token === "null") return res.status(401).send({msg: "Авторезируйтесь для продолжения работы"})
    const user = await db.Users.findOne({fbToken: token})
    // if (!user) return res.status(500).send({msg: "Ошибка сервера. Возможно кодер x_x"})
    if (user) {
        req.userID = user._id
        return next()
    }
    const payload = await jwt.verify(token, process.env.JWT_KEY)
    if (!payload) return res.status(401).send({msg: "Неверный токен", token, payload})
    req.userID = payload._id
    const findedUser = await db.Users.findOne({ _id: payload._id})
    if (!findedUser) return res.status(401).send({msg: "Данного ююзера не существует =("})
    next()
}
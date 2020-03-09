const jwt = require('jsonwebtoken')
const { privatKey } = require('../config/index')

module.exports = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).send({msg: "Нет токена"})
    // console.log(req.headers);
    
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') return res.status(401).send({msg: "Авторезируйтесь для продолжения работы"})
    let payload = jwt.verify(token, privatKey)
    if (!payload) return res.status(401).send({msg: "Неверный токен"})
    req.userID = payload._id
    req.fbID = payload.fbID
    let user = db.Users.findOne({ _id: payload._id})
    if (!user) return res.status(401).send({msg: "Данного ююзера не существует =("})
    next()
}
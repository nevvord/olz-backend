const bcryptjs = require('bcryptjs')

module.exports = async (req, res) => {
    const { email, password, name } = req.body
    const fbToken = req.headers.authorization.split(' ')[1]
    if (!fbToken) return res.status(401).send({msg: "Токен не был извлечен"})
    
    const user = await db.Users.findOne({email})
    if (user) return res.status(401).send({msg: `Опять сбой! Этого сообщения не должно быть! )_(`})  
    const solt = await bcryptjs.genSalt(10)
    if (!solt) return res.status(500).send({msg: 'E:9 Ошибка сервера. Возможно кодер x_x', error})
    const hash = await bcryptjs.hash(password, salt)
    if (!hash) return res.status(500).send({msg: 'E:11 Ошибка сервера. Возможно кодер x_x(', error})
    const newUser = await db.Users.create({...req.body, password: hash, fbToken})
    newUser.save().then(async result => {
        const unUser = await db.UnUsers.findOne({email})
        unUser.remove()
        res.send({ msg: `Регистрация нового аккаунта успешна. Добро пожаловать ${name}! `, user: result})
    }).catch((err) => {
        res.status(500).send({err})
    })
}
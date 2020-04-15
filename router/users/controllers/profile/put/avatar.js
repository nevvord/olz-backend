const directory = 'uploads/'
const { readdirSync, unlink } = require('fs')
const { fullPath } = require('../../../../../config/')

module.exports = (req, res) => {
    const { avatar } = req.body
    const file = req.file
    const _id = req.userID

    db.Users.findOne({_id}, (error, call) => {
        if (error) return res.status(500).send({msg: "Нереальная ошибка! Если вы это видете то стоит купить лоторейный билет!"})
        const UserAvatar = call.avatar
        readdirSync(directory).forEach(file => {
            if (file === call.avatar.split('/')[3]) unlink(directory + file, error => console.error(error)) 
        })
    })
    if (avatar) {
        db.Users.updateOne({_id}, {$set: {avatar}}).exec(error => {
            if (error) return res.status(500).send({msg: "Ошибка сервера. Неудалось сохранить аватар(("})
            res.send({msg: "Аватар изменен успешно!"})
        })
    }else{
        const curFile = `${fullPath}/${file.filename}`
        db.Users.updateOne({_id}, {$set: {avatar: curFile}}, error => {
            if (error) return res.status(500).send({msg: "Ошибка сервера. Неудалось сохранить аватар(("})
            res.send({msg: "Аватар изменен успешно", avatar: curFile})
        })
    }
}
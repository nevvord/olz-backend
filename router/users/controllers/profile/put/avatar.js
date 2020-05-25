const directory = 'uploads/'
const { readdirSync, unlink } = require('fs')
const { fullPath } = require('../../../../../config/')
const  mongoose = require('mongoose')


module.exports = async (req, res) => {
    const { avatar } = req.body
    const file = req.file
    const _id = req.userID

    const user = await db.Users.findOne({_id})
    if (!user) return res.status(500).send({msg: "Неудалось найти пользователя 0_0"})
    if (user.avatar.file) {
        const avatarFile = await db.Images.findOne({_id: user.avatar.file})
        if (avatarFile) {
            unlink(avatarFile.path, error => {
                console.error(error)
            })
            await avatarFile.remove()
        }
        user.avatar.file = null
    } 
    if (avatar) {
        user.avatar.link = avatar        
        user.save().then((result) => {
            res.send({msg: "Аватар успешно изменен"})
        }).catch((err) => {
            res.status(500).send({msg: "Неудалось изменить аватар. Может стоит попробовать еще раз?", user})
        })
    }
    if (file) {
        const image = new db.Images({
            _id: new mongoose.Types.ObjectId(),
            name: file.filename,
            path: file.path,
            size: file.size
        })
        await image.save().catch(error => {
            unlink(file.path).catch(error => {
                console.error(error)
            })
            return res.send({msg: "Неудалось сохранить картинку", error})
        })
        user.avatar.link = image.name
        user.avatar.file = image._id
        await user.save().then((result) => {
            res.send({msg: "Аватар успешно изменен", user})
        }).catch((err) => {
            res.status(500).send({msg: "Неудалось изменить аватар. Может стоит попробовать еще раз?"})
        }) 
    }





    // db.Users.findOne({_id}, (error, user) => {
    //     if (error) return res.status(500).send({msg: "Нереальная ошибка! Если вы это видете то стоит купить лоторейный билет!"})
    //     const UserAvatar = user.avatar
    //     readdirSync(directory).forEach(file => {
    //         if (file === user.avatar.split('/')[3]) unlink(directory + file, error => console.error(error)) 
    //     })
    // })
    // if (avatar) {
    //     db.Users.updateOne({_id}, {$set: {avatar}}).exec(error => {
    //         if (error) return res.status(500).send({msg: "Ошибка сервера. Неудалось сохранить аватар(("})
    //         res.send({msg: "Аватар изменен успешно!"})
    //     })
    // }else{
    //     const curFile = `${fullPath}/${file.filename}`
    //     db.Users.updateOne({_id}, {$set: {avatar: curFile}}, error => {
    //         if (error) return res.status(500).send({msg: "Ошибка сервера. Неудалось сохранить аватар(("})
    //         res.send({msg: "Аватар изменен успешно", avatar: curFile})
    //     })
    // }
}
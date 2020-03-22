module.exports = (req, res) => {
    const {email, name, avatar, fbID} = req.body
    db.Users.findOne({email}, (error, user) => {
        if (error) return res.status(500).send({msg: "Ошибка сервера. Возможно кодер x_x"})
        if (!user) return res.status(404).send({msg: "Новый пользователь. Нужен пароль"})
        if (user.fbID !== fbID) {
            db.Users.updateOne({_id: user._id}, {$set: {fbID, avatar, name}}).exec((error, resultat) => {
                if (error) return res.status(500).send({msg: "Ошибка сервера. Возможно кодер x_x"})
                return res.send({msg: "Фейсбук аккаунт привязан", user: {...user, avatar, fbID, name}})
            })
        }else{
            return res.send({msg: `Добро пожвловать ${user.name}`, user})
        }
})

        
        



    
    
    
    
}

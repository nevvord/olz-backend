module.exports = async (req, res) => {
    const { key } = req.body
    const unUser = db.UnUsers.findOne({key})
    if (!user) return res.status(404).send({msg: "Даный пользователь не был зарегестрирован, а значет и подтверждать некого 0_0"})
    unUser.remove()
    const newUser = {
        password: unUser.password,
        email: unUser.email,
        name: unUser.name
    }
    const user = await new db.Users(newUser)
    user.save().then((result) => {
        res.send({msg: "Верефикация прошла успешно", user: resultat})        
    }).catch((err) => {
        res.status(500).send({msg: "E:9 Ошибка сервера. Возможно кодер x_x", err})
    })
            
}
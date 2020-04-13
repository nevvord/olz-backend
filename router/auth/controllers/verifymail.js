module.exports = (req, res) => {
    const { key } = req.body
    db.UnUsers.findOne({key}, (error, user) => {
        if (error) return res.status(500).send({msg: "E:4 Ошибка сервера. Возможно кодер x_x"})
        if (!user) return res.status(404).send({msg: "Даный пользователь не был зарегестрирован, а значет и подтверждать некого 0_0"})
        db.UnUsers.remove({_id: user._id}, error => {
            if (error) return res.status(500).send({msg: "E:7 Ошибка сервера. Возможно кодер x_x"})
            const newUser = {
                password: user.password,
                email: user.email,
                name: user.name
            }
            db.Users.create(newUser, (error, resultat) => {
                if (error) return res.status(500).send({msg: "E:9 Ошибка сервера. Возможно кодер x_x"})
                res.send({msg: "Верефикация прошла успешно", user: resultat})
            })
        })
    })
}
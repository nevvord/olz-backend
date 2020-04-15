module.exports = (req, res) => {
    const _id = req.params.id
    db.Users.findOne({login: _id}, (error, user) => {
        console.error(error);
        if (error) return res.status(404).send({msg: "Пользователь с таким id не найден"})
        if(!user) {
            db.Users.findOne({ _id}, (error, user) => {
                console.error(error);
                if (error) return res.status(404).send({msg: "Пользователь с таким id не найден"})
                const curUser = {...user._doc, password: '***'}
                res.send({user: curUser})
            })
        } else {
            const curUser = {...user._doc, password: '***'}
            res.send({user: curUser})
        }
    })
}
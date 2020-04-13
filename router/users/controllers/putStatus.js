module.exports = (req, res) => {
    const { status } = req.body
    db.Users.updateOne({_id: req.userID}, {$set: {status}})
            .exec(error => {
                if (error) return res.status(500).send({msg: "Ошибка сервера. Возможно кодер x_x"})
                res.send({msg: "Статус успешно изменен!"})
            })
}
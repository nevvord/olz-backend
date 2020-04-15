module.exports = (req, res) => {
    const _id = req.userID

    db.Users.updateOne({_id}, {$set: {...req.body}}, error => {
        if (error) res.status(500).send({msg: "Ошибка? 0_0"})
        res.send({msg: "Изменение информации упешно", user: {...req.body}})
    })
}
module.exports = async (req, res) => {
    const user = await db.Users.findOne({_id: req.userID})
    if (!user) return res.status(404).send({msg: "Пользователь не найден"})
    res.send({user})
}
module.exports = (req, res) => {
    if (!req.userID) return res.status(401).send({msg: "Auth plz"})
    const user = db.Users.findOne({_id: userID})
    if (!user) return res.status(404).send({msg: "User not found"})
    return res.send({user})
}
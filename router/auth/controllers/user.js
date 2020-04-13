module.exports = (req, res) => {
    if (!req.userID) return res.status(401).send({msg: "Auth plz"})
    db.Users.findOne({_id: req.userID}).exec((error, user) => {
        if (error) return res.status(500)
        if (!user) return res.status(404).send({msg: "User not found"})
        return res.status(200).send({user})
    })
    
}
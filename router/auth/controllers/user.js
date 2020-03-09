module.exports = (req, res) => {
    if (!req.userID) return res.status(401).send({msg: "Auth plz"})
    console.log(req.userID);
    
    db.Users.findOne({_id: req.userID}).exec((error, resultat) => {
        if (error) return res.status(500)
        if (!resultat) return res.status(404).send({msg: "User not found"})
        console.log(resultat);

        return res.status(200).send(resultat)
    })
    
}
const bcryptjs = require('bcryptjs')
module.exports = (req, res) => {
    let email = req.body.email.toLowerCase()
    let password = req.body.password.toString()
    db.Users.findOne({email}).exec((er, re) => {
        if(re) return res.status(401).send({msg: "Пользователь с данным почтовым адресом сушествует"})
        console.log(re);
        
        bcryptjs.genSalt(10, (err, salt) => {
        if (err) return res.status(500).send({msg: 'Salt error.', err})
        
        bcryptjs.hash(password, salt, (err, hash) => {
            if (err) return res.status(500).send({msg: 'Hash error.', err})
            
            db.Users.create({...req.body, password: hash}, (error, resultat) => {
                if (error)  return res.status(500).send({error})
                
                res.send({ msg: "Registration success.", resultat })
                })
            })
        })
    })
    
}
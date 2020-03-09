const axios = require('axios')
const jwt = require('jsonwebtoken')
const { privatKey } = require('../../../config/index')

// const bcryptjs = require('bcryptjs')
module.exports = (req, res) => {
    const {userID, accessToken} = req.body
    axios.get(`https://graph.facebook.com/${userID}?fields=id,name,email&access_token=${accessToken}`).then(resultat => {
        const {email, name, id} = resultat.data
            db.Users.findOne({email}).exec((error, result) => {
                if (error) return res.status(500)
                if (result) {
                    if (!result.fbID) {
                        // console.log(result.fbID);
                        
                        db.Users.updateOne({_id: result._id}, {$set: {fbID: id}}).exec((error, resultat) => {
                            if (error) return res.status(500)
                            console.log("Resultat1.8: ", resultat);
                            const token = jwt.sign({fbID: id, _id: result._id}, privatKey) 
                            return res.send({msg: `Welcome ${name}`, status: 'success', user: {...result, fbID: id}})  
                        })
                    }else{
                        if(result.fbID == id) {
                            console.log("20:", result);
                            const token = jwt.sign({fbID: id, _id: result._id}, privatKey) 
                            return res.send({msg: `Welcome ${name}`, status: 'success', user: result, token}) 
                             
                        }
                    }
                }else{
                    db.Users.create({email, name, fbID: id}, (error,resultat) => {
                        if (error) return res.status(500)
                        console.log(resultat);
                        const token = jwt.sign({fbID: id, _id: resultat._id}, privatKey)
                        console.log(token);
                        
                        return res.send({msg: `Welcome ${name}`, status: 'success', user: resultat, token })  

                    })
                }
            })
    })
}

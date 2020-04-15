const   { readdirSync } = require('fs')
module.exports = (req, res) => {
    const directory = 'static/images/avatars'
    const avatars = readdirSync(directory)
    if (avatars) return res.send({avatars})
}
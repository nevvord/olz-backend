const   mongoose        =   require('mongoose')
//===== Config =====
require('dotenv').config()
//===== DB =====
const   connectionPath      =   `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`
const   connectionOptions   =   {useNewUrlParser: true, useUnifiedTopology: true}
const   connection          =   mongoose.createConnection(connectionPath, connectionOptions)

//===== Connections =====
connection.on('connected',      ()      => { console.log(`Mongoose conected to ${process.env.DB_NAME} db`)})
connection.on('error',          (err)   => { console.log(`Mongoose not conected to ${process.env.DB_NAME} db: `, err)})
connection.on('disconnected',   ()      => { console.log(`Mongoose disconected with ${process.env.DB_NAME} db`)})

//===== Module exports =====
module.exports = () => {
    console.log(`Returning db...`)
    //===== Return models =====
    return{
        connection,
        Users: require('./models/Users')(mongoose, connection),
        UnUsers: require('./models/UnverifiedUsers')(mongoose, connection),
        Categories: require('./models/Categories')(mongoose, connection),
        SubCategories: require('./models/SubCategories')(mongoose, connection),
        Publications: require('./models/Publications')(mongoose, connection),
        Images: require('./models/Images')(mongoose, connection)
    }
}
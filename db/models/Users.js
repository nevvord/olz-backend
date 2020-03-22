module.exports = (mongoose, connection) =>
    connection.model('Users', new mongoose.Schema({
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        login: {
            type: String
        },
        avatar: String,
        name: String,
        fbID: String
    }))
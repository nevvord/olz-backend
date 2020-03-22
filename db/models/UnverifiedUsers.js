module.exports = (mongoose, connection) =>
    connection.model('UnUsers', new mongoose.Schema({
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
        name: String,
        fbID: String,
        key: String
    }))
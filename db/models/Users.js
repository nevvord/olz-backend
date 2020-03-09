module.exports = (mongoose, connection) =>
    connection.model('Users', new mongoose.Schema({
        password: {
            type: String,
            // required: true
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
        massage: [{
            sender: {
                msg: [{
                    _id: mongoose.Schema.Types.ObjectId,
                    date: {
                        type: Date,
                        default: Date.now
                    },
                    text: String,
                    read: {
                        type: Boolean,
                        default: false
                    }
                }]
            }
        }]
    }))
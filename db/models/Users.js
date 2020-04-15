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
        login: String,
        avatar: String,
        name: String,
        fbID: String,
        fbToken: String,
        phoneNumber: String,
        city: String,
        business: String,
        sp: String,
        about: String,
        status: String,
        dateBirthday: Date,
        social: {
            facebook: {type: String, default: ''},
            instagram: {type: String, default: ''}
        }
    }))
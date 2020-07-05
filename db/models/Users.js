module.exports = (mongoose, connection) =>
    connection.model('Users', new mongoose.Schema({
        password: { type: String, required: true },
        email: { type: String, required: true },
        date: { type: Date, default: Date.now },
        login: { type: String, maxLength: 40 },
        avatar: {
            link: {type: String, default: 'images/avatars/avraam.jpg'},
            file: {type: mongoose.Schema.Types.ObjectId, ref: 'Images'}
        },
        name: {type: String, maxLength: 40},
        fbID: String,
        fbToken: String,
        phoneNumber: [{type: String, maxLength: 13}],
        city: {type: String, maxLength: 40},
        business: Number, // 1 - Частное лицо, 2 - Юридическое лицо
        sp: Number,
        about: {type: String, maxLength: 350},
        status: {type: String, maxLength: 55},
        dateBirthday: String,
        publications: [{type: mongoose.Schema.Types.ObjectId, ref: 'Publications'}],
        social: {
            facebook: {type: String, default: ''},
            instagram: {type: String, default: ''}
        }
    }))
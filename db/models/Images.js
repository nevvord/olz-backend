module.exports = (mongoose, connection) =>
connection.model('Images', new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  path: String,
  size: Number,
  uploader: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  avatar: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  publication: {type: mongoose.Schema.Types.ObjectId, ref: 'Publications'},
  date: {type: Date, default: Date.now}
}))
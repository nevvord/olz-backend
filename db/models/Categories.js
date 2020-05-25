module.exports = (mongoose, connection) =>
  connection.model('Categories', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titleEn: String,
    titleRu: String,
    titleUa: String,
    date: {type: Date, default: Date.now},
    subCategories: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'SubCategories',
    }],
    publications: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Publications',
    }]
  }))
module.exports = (mongoose, connection) =>
  connection.model('SubCategories', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titleEn: String,
    titleRu: String,
    titleUa: String,
    date: {type: Date, default: Date.now},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Categories'},
    publications: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Publications',
    }],
    characteristics: Array
    
  }))
module.exports = (mongoose, connection) => 
  connection.model('Publications', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    title: {type: String, required: true, maxLangth: 71},
    description: {type: String, maxLangth: 10001},
    images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Images'}],
    date: {type: Date, default: Date.now},
    prices: [new mongoose.Schema({
      price: Number,
      type: String, //USD, EUR, UAN
      bargain: Boolean,
      exchange: Boolean,
      date: {type: Date, default: Date.now}
    })],
    characteristics: [],
    category: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Categories', 
      required: true
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'SubCategories', 
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Users', 
      required: true
    }
  }))

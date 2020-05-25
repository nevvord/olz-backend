const {Types} = require('mongoose')

module.exports = async (req, res) => {
  const images = req.files
  if (!images) return res.status(404).send({msg: "Изображений ненайденно"})
  let savedImages = []
  await images.map( async image => {
    const newImage = new db.Images({
      _id: new Types.ObjectId(),
      name: image.filename,
      path: image.path,
      size: image.size,
      uploader: req.userID
    })
    savedImages.push(newImage._id)
    await newImage.save()
  })
  res.send({images: savedImages})
}
const path = require('path')
const multer = require('multer')

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'images'),
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
}

const ImageService = require('../services/ImageService')

class ImageController {
  async store (req, res) {
    try {
      const images = await ImageService.create({
        ...req.body,
        files: req.files
      })

      return res.json(images)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }
}

module.exports = new ImageController()

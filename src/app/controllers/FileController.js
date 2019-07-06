const path = require('path')

class FileController {
  show (req, res) {
    const { file } = req.params

    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'images',
      file
    )

    return res.sendFile(filePath)
  }

  store (req, res, err) {
    if (err) {
      return res.status(500).json({ error: 'Error uploading files' })
    }

    return res.json(req.files)
  }
}

module.exports = new FileController()

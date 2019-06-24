const { Image } = require('../models')
// const AlreadyExistsError = require('../errors/AlreadyExistsError')

class ImageService {
  async create (data) {
    const { type_id: type, files } = data

    const productImages = files.map(file => {
      const match = file.filename.match('@(?<ratio>\\d)x')
      const ratio = match ? match.groups.ratio : '1'

      return {
        type_id: type,
        file: file.filename,
        ratio
      }
    })

    return Image.bulkCreate(productImages, { returning: true })

    // if (await Image.findOne({ where: { files, type_id: type } })) {
    //   throw new AlreadyExistsError('Image for this type')
    // }
  }
}

module.exports = new ImageService()

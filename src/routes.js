const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const ProductController = require('./app/controllers/ProductController')
const TypeController = require('./app/controllers/TypeController')
const PriceController = require('./app/controllers/PriceController')
const SizeController = require('./app/controllers/SizeController')
const ImageController = require('./app/controllers/ImageController')
const FileController = require('./app/controllers/FileController')
const OrderController = require('./app/controllers/OrderController')
const MenuController = require('./app/controllers/MenuController')

routes.get('/files/:file', FileController.show)

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

routes.get('/products', ProductController.index)
routes.get('/products/:id/types', ProductController.show)
routes.post('/products', upload.single('image'), ProductController.store)
routes.put('/products/:id', upload.single('image'), ProductController.update)

routes.get('/types', TypeController.index)
routes.get('/types/:id/prices', TypeController.show)
routes.post('/types', TypeController.store)

routes.get('/sizes', SizeController.index)
routes.post('/sizes', SizeController.store)

routes.get('/prices', PriceController.index)
routes.post('/prices', PriceController.store)

routes.post('/images', upload.array('images', 3), ImageController.store)

routes.get('/menu', MenuController.index)

routes.get('/orders', OrderController.index)
routes.post('/orders', OrderController.store)

routes.post('/session', SessionController.store)

routes.get('/teste', authMiddleware, (req, res) => res.json({ message: 'ok' }))

module.exports = routes

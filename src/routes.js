const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const ProductController = require('./app/controllers/ProductController')
const TypeController = require('./app/controllers/TypeController')
const FileController = require('./app/controllers/FileController')
const OrderController = require('./app/controllers/OrderController')

routes.get('/files/:file', FileController.show)
routes.post('/files', upload.array('images'), FileController.store)

routes.get('/users', UserController.index)
routes.get('/users/:id/orders', UserController.listOrders)
routes.get('/users/:id/cart', UserController.getOpenCart)
routes.post('/users', UserController.store)

routes.get('/products', ProductController.index)
routes.get('/products/:id/types', ProductController.listTypes)
routes.post('/products', ProductController.store)
routes.put('/products', ProductController.store)

routes.get('/types/:id/prices', TypeController.listPrices)

routes.get('/orders', OrderController.index)
routes.post('/orders', OrderController.store)
routes.put('/orders/:id', OrderController.update)
routes.put('/orders/:id/confirm', OrderController.confirmOrder)
routes.get('/orders/:id/items', OrderController.listOrderItems)
routes.post('/orders/:id/items', OrderController.addItem)
routes.delete('/orders/:id/items/:itemId', OrderController.removeItem)

routes.post('/session', SessionController.store)

routes.get('/teste', authMiddleware, (req, res) => res.json({ message: 'ok' }))

module.exports = routes

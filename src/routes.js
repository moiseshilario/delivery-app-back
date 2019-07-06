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

/**
 * Public routes
 */
routes.get('/files/:file', FileController.show)
routes.post('/files', upload.array('images'), FileController.store)

routes.post('/session', SessionController.store)

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

routes.get('/products', ProductController.index)
routes.get('/products/:id/types', ProductController.listTypes)

routes.get('/types/:id/prices', TypeController.listPrices)

/**
 * Private routes
 */
routes.use(authMiddleware)

routes.get('/users/:id/orders', UserController.listOrders)
routes.get('/users/:id/cart', UserController.getOpenCart)

routes.post('/products', ProductController.store)
routes.put('/products', ProductController.store)

routes.get('/orders', OrderController.index)
routes.post('/orders', OrderController.store)
routes.put('/orders/:id', OrderController.update)
routes.put('/orders/:id/confirm', OrderController.confirmOrder)
routes.get('/orders/:id/items', OrderController.listOrderItems)
routes.post('/orders/:id/items', OrderController.addItem)
routes.delete('/orders/:id/items/:itemId', OrderController.removeItem)

module.exports = routes

const express = require('express')
const authMiddleware = require('../../middlewares/authMiddleware')
const router = express.Router()



const systemTradesmanController = require('./../../controllers/systemControllers/tradesman.controller')


router.get('/tradesman/dashboard', authMiddleware.isLoggedIn, authMiddleware.isTradesman, systemTradesmanController.renderTradesmanDashboard)
router.get('/tradesman/orders', authMiddleware.isLoggedIn, authMiddleware.isTradesman, systemTradesmanController.renderTradesManOrders)


module.exports = router;
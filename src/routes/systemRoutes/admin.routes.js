const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')

const adminControllersPath = './../../controllers/systemControllers/admin/'

const systemEmployeesController = require(adminControllersPath+'employees.controller')
const systemCustomersController = require(adminControllersPath+'customers.controller')
const systemProductController = require('./../../controllers/systemControllers/admin/products.controller')
const systemTablesController = require(adminControllersPath+'tables.controller')
const systemAdminController = require(adminControllersPath+'admin.controller')
const systemShoppingController = require(adminControllersPath+'shopping.controller')
const systemInventoryController = require(adminControllersPath+'inventory.controller')
const systemPaymentController = require(adminControllersPath+'payment.controller')
const systemPaymentsControlController = require(adminControllersPath+'paymentscontrol.controller')
const systemPaymentsLineControlController = require(adminControllersPath+'paymentslinecontrol.controller')

router.get('/admin/dashboard', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemAdminController.renderAdminDashboard)

router.get('/admin/employees', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemEmployeesController.renderEmployees)
router.post('/admin/saveemployee', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemEmployeesController.SaveEmplooyee)
router.post('/admin/editemployee/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin,  systemEmployeesController.editEmployee)
router.get('/admin/deleteemployee/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin,  systemEmployeesController.deleteEmployee)

router.get('/admin/customers', authMiddleware.isLoggedIn, authMiddleware.isAdmin,  systemCustomersController.renderCustomers)
router.post('/admin/savecustomer', authMiddleware.isLoggedIn, authMiddleware.isAdmin,  systemCustomersController.SaveCustomer)
router.post('/admin/editcustomer/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin,  systemCustomersController.editCustomer)
router.get('/admin/deletecustomer/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin,  systemCustomersController.deleteCustomer)

router.get('/admin/products', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemProductController.renderProducts)
router.post('/admin/saveproduct', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemProductController.SaveProduct)
router.post('/admin/editproduct/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemProductController.editProduct)
router.get('/admin/deleteproduct/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemProductController.deleteProduct)

router.get('/admin/tables', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemTablesController.renderTables)
router.post('/admin/savetable', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemTablesController.SaveTable)
router.get('/admin/deletetable/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemTablesController.deleteTable)

router.get('/admin/shopping', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemShoppingController.renderShopping)
router.get('/admin/productsShopping', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemShoppingController.renderProductShopping)
router.post('/admin/saveshopping', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemShoppingController.SaveShopping)
router.get('/admin/deleteshopping/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemShoppingController.DeleteShopping)

router.get('/admin/inventory', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemInventoryController.renderInventory)

router.get('/admin/payment', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemPaymentController.renderPayment)
router.get('/admin/detailaccount/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemPaymentController.renderDetailAccount)
router.post('/admin/savepayment/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemPaymentController.SavePayment)

router.get('/admin/paymentscontrol', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemPaymentsControlController.renderPaymentscontrol)
router.get('/admin/paymentscontrol/detailaccount/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemPaymentsControlController.renderDetailAccount)

router.get('/admin/paymentslinecontrol', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemPaymentsLineControlController.renderPaymentslinecontrol)
router.get('/admin/paymentslinecontrol/detailaccount/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemPaymentsLineControlController.renderDetailAccount)

module.exports = router;
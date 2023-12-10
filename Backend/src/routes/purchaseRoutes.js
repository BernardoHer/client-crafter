// routes/purchaseRoutes.js
const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

// Rutas CRUD para las compras
router.post('/purchases', purchaseController.createPurchase);
router.get('/purchases', purchaseController.getAllPurchases);
router.get('/purchases/:id', purchaseController.getPurchaseById);
router.put('/purchases/:id', purchaseController.updatePurchaseById);
router.delete('/purchases/:id', purchaseController.deletePurchaseById);

module.exports = router;

// controllers/purchaseController.js
const purchaseService = require('../services/purchaseService');

async function createPurchase(req, res) {
  try {
    const purchase = await purchaseService.createPurchase(req.body);
    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllPurchases(req, res) {
  try {
    const purchases = await purchaseService.getAllPurchases();
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPurchaseById(req, res) {
  const { id } = req.params;
  try {
    const purchase = await purchaseService.getPurchaseById(id);
    res.status(200).json(purchase);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function updatePurchaseById(req, res) {
  const { id } = req.params;
  try {
    const purchase = await purchaseService.updatePurchaseById(id, req.body);
    res.status(200).json(purchase);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function deletePurchaseById(req, res) {
  const { id } = req.params;
  try {
    await purchaseService.deletePurchaseById(id);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchaseById,
  deletePurchaseById,
};

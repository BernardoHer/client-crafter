// services/purchaseService.js
const Purchase = require('../models/purchase');
const User = require('../models/user');
async function createPurchase(data) {
  try {
    const {customer_id, amount, status} = data;
    const user = await User.findById(customer_id);

    if(!user){
      throw new Error('User not found!')
    }
    
    const purchase = await Purchase.create(data);
    user.purchases.push(purchase._id);
    await user.save();

    return purchase;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllPurchases() {
  try {
    const purchases = await Purchase.find();
    return purchases;
  } catch (error) {
    throw new Error('Error al obtener las compras');
  }
}

async function getPurchaseById(id) {
  try {
    const purchase = await Purchase.findById(id);
    if (!purchase) {
      throw new Error('Compra no encontrada');
    }
    return purchase;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updatePurchaseById(id, data) {
  try {
    const purchase = await Purchase.findByIdAndUpdate(id, data, { new: true });
    if (!purchase) {
      throw new Error('Compra no encontrada');
    }
    return purchase;
  } catch (error) {
    throw new Error('Error al actualizar la compra');
  }
}

async function deletePurchaseById(id) {
  try {
    const purchase = await Purchase.findByIdAndDelete(id);
    if (!purchase) {
      throw new Error('Purchase not found');
    }
    const user = await User.findById(purchase.customer_id);
    if (user) {
      user.purchases.pull(purchase._id);
      await user.save();
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchaseById,
  deletePurchaseById,
};

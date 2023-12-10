// models/purchase.js
const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  customer_id: { type:String, ref: 'User' },
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  date: { type: Date,
    default: Date.now, },
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;

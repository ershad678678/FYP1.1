const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
    name : { type: String, required: true },
    items : [{ type: Object, required: true }],
}, {
    timestamps: true,
});

const Purchases = mongoose.model('Purchases', PurchaseSchema);

module.exports = Purchases;
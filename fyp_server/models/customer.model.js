const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    label : { type: String, required: true },
    descriptor : { type: Object, required: true },
    picture : { type: String, required: true },
    age: { type: Number, required: true },
    gender : { type: String, required: true },
    expression : { type: String, required: true },
    visits : { type: Number, required: true },
}, {
    timestamps: true,
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VisitsSchema = new Schema({
    name : { type: String, required: true },
    gender : { type: String, required: true },
    expression : { type: String, required: true },
    visit_no : { type: Number, required: true },
    purchase : [{ type: Object, required: true }],
    date: { type: String, required: true },
    time : { type: String, required: true },
}, {
    timestamps: false,
});

const Visits = mongoose.model('Visits', VisitsSchema);

module.exports = Visits;
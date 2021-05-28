const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecommendationsSchema = new Schema({
    name : { type: String, required: true },
    recommendation : [{ type: Object, required: true }],
    persons : [{ type: String, required: true }]
}, {
    timestamps: true,
});

const Recommendations = mongoose.model('Recommendations', RecommendationsSchema);

module.exports = Recommendations;
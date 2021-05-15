const router = require('express').Router();
let MultiBarChart = require('../models/multibarchart.model.js');
let Visits = require('../models/visits.model');

router.route('/').get((req, res) => {
    MultiBarChart.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(500).json('Error: '+ err));
});

router.route('/add').put((req, res) => {
    let arr1 = [];
    let arr2 = [];
    Visits.count({
        $and: [ { expression: 'neutral' }, { gender : 'male' } ]
    }).then(res => arr1.push(res));
    Visits.count({
        $and: [ { expression: 'neutral' }, { gender : 'female' } ]
    }).then(res => arr2.push(res));
    Visits.count({
        $and: [ { expression: 'happy' }, { gender : 'male' } ]
    }).then(res => arr1.push(res));
    Visits.count({
        $and: [ { expression: 'happy' }, { gender : 'female' } ]
    }).then(res => arr2.push(res));
    Visits.count({
        $and: [ { expression: 'sad' }, { gender : 'male' } ]
    }).then(res => arr1.push(res));
    Visits.count({
        $and: [ { expression: 'sad' }, { gender : 'female' } ]
    }).then(res => arr2.push(res));
    Visits.count({
        $and: [ { expression: 'angry' }, { gender : 'male' } ]
    }).then(res => arr1.push(res));
    Visits.count({
        $and: [ { expression: 'angry' }, { gender : 'female' } ]
    }).then(res => arr2.push(res));
    Visits.count({
        $and: [ { expression: 'fearful' }, { gender : 'male' } ]
    }).then(res => arr1.push(res));
    Visits.count({
        $and: [ { expression: 'fearful' }, { gender : 'female' } ]
    }).then(res => arr2.push(res));
    Visits.count({
        $and: [ { expression: 'disgusted' }, { gender : 'male' } ]
    }).then(res => arr1.push(res));
    Visits.count({
        $and: [ { expression: 'disgusted' }, { gender : 'female' } ]
    }).then(res => arr2.push(res));
    Visits.count({
        $and: [ { expression: 'surprised' }, { gender : 'male' } ]
    }).then(res => arr1.push(res));
    Visits.count({
        $and: [ { expression: 'surprised' }, { gender : 'female' } ]
    }).then(res => {
        arr2.push(res);
        MultiBarChart.updateOne(
            {},
            {$set: {bar1data: arr1 , bar2data: arr2} }
        ).then(console.log("Updated"));
    }).catch(err => res.status(500).json('Error: '+ err));
});

router.route('/delete/:id').delete((req, res) => {
    id = req.params.id;
    console.log(id)
    MultiBarChart.deleteOne({_id : id}).then(
        () => {
            res.send('Deleted')
        }
    )
})

router.route('/deleteall').delete((req, res) => {
    MultiBarChart.deleteMany({}).then(
        () => {
            res.send('Deleted')
        }
    )
})

module.exports = router;
const router = require('express').Router();
let LineGraph = require('../models/linegraph.model.js');
let Visits = require('../models/visits.model.js');

router.route('/').get((req, res) => {
    LineGraph.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(500).json('Error: '+ err));
});

router.route('/add').put((req, res) => {
    let hour_count = [];
    Visits.count({ time: {$regex: /^8:\d\d:\d\d AM$/} })
        .then(res => hour_count.push(res));
    Visits.count({ time: {$regex: /^9:\d\d:\d\d AM$/} })
        .then(res => hour_count.push(res));
    Visits.count({ time: {$regex: /^10:\d\d:\d\d AM$/} })
        .then(res => hour_count.push(res));
    Visits.count({ time: {$regex: /^11:\d\d:\d\d AM$/} })
        .then(res => hour_count.push(res));
    Visits.count({ time: {$regex: /^12:\d\d:\d\d PM$/} })
        .then(res => hour_count.push(res));
    Visits.count({ time: {$regex: /^1:\d\d:\d\d PM$/} })
        .then(res => hour_count.push(res));
    Visits.count({ time: {$regex: /^2:\d\d:\d\d PM$/} })
        .then(res => hour_count.push(res));
    Visits.count({ time: {$regex: /^3:\d\d:\d\d PM$/} })
        .then(res => hour_count.push(res));
    Visits.count({ time: {$regex: /^4:\d\d:\d\d PM$/} })
        .then(res => hour_count.push(res));
    Visits.count({ time: {$regex: /^5:\d\d:\d\d PM$/} })
        .then(res => hour_count.push(res));
    Visits.count({ time: {$regex: /^6:\d\d:\d\d PM$/} })
        .then(res => {
            hour_count.push(res);
            LineGraph.updateOne(
                {},
                {$set: {data: hour_count}}
            ).then(console.log("Updated"));
        }).catch(err => res.status(500).json('Error: '+ err));
});

router.route('/delete/:id').delete((req, res) => {
    var id = req.params.id;
    console.log(id)
    LineGraph.deleteOne({_id : id}).then(
        () => {
            res.send('Deleted')
        }
    )
})



module.exports = router;
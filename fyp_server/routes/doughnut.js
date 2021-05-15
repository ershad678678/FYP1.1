const router = require('express').Router();
let DoughnutChart = require('../models/doughnut.model.js');
let Visits = require('../models/visits.model');

router.route('/').get((req, res) => {
    DoughnutChart.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(500).json('Error: '+ err));
});

router.route('/add').put((req, res) => {
    let expr_count = [];
    Visits.count({
        expression: 'neutral'
    }).then(res => expr_count.push(res));
    Visits.count({
        expression: 'happy'
    }).then(res => expr_count.push(res));
    Visits.count({
        expression: 'sad'
    }).then(res => expr_count.push(res));
    Visits.count({
        expression: 'angry'
    }).then(res => expr_count.push(res));
    Visits.count({
        expression: 'fearful'
    }).then(res => expr_count.push(res));
    Visits.count({
        expression: 'disgusted'
    }).then(res => expr_count.push(res));
    Visits.count({
        expression: 'surprised'
    }).then(res => {
        expr_count.push(res); 
        DoughnutChart.updateOne(
            {},
            {$set: {data: expr_count}}
        ).then(console.log("Updated"));
    }).catch(err => res.status(500).json('Error: '+ err));
});

router.route('/delete/:id').delete((req, res) => {
    id = req.params.id;
    console.log(id)
    DoughnutChart.deleteOne({_id : id}).then(
        () => {
            res.send('Deleted')
        }
    )
})



module.exports = router;
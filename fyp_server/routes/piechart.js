const router = require('express').Router();
let PieChart = require('../models/piechart.model.js');
let Customer = require('../models/customer.model.js');

router.route('/').get((req, res) => {
    PieChart.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(500).json('Error: '+ err));
});

router.route('/add').put((req, res) => {
    let male, female = 0;
    let count = [];
    Customer.count({
        gender: "male"
    }).then(res => {male = res;console.log(male); count.push(male)});
    Customer.count({
        gender: "female"
    }).then(res => {
        female = res;
        console.log(female);
        count.push(female); 
        PieChart.updateOne(
            {},
            {$set: {data: count}}
        ).then(console.log("Updated"));
    }).catch(err => res.status(500).json('Error: '+ err));
});

router.route('/delete/:id').delete((req, res) => {
    id = req.params.id;
    console.log(id)
    PieChart.deleteOne({_id : id}).then(
        () => {
            res.send('Deleted')
        }
    )
})



module.exports = router;
const router = require('express').Router();
let BarChart = require('../models/barchart.model.js');
let Customer = require('../models/customer.model.js');

router.route('/').get((req, res) => {
    BarChart.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(500).json('Error: '+ err));
});

/*modified route*/
router.route('/add').put((req, res) => {
    let c0,c1,c2,c3,c4,c5 = 0;
    let c_array = [];
    Customer.count({
        $and: [ { age: { $gt : 0 } }, { age : { $lt: 16 } } ]
    }).then(res => {c0 = res;console.log(c0); c_array.push(c0)});
    Customer.count({
        $and: [ { age: { $gt : 15 } }, { age : { $lt: 26 } } ]
    }).then(res => {c1 = res;console.log(c1); c_array.push(c1)});
    Customer.count({
        $and: [ { age: { $gt : 25 } }, { age : { $lt: 36 } } ]
    }).then(res => {c2 = res;console.log(c2); c_array.push(c2)});
    Customer.count({
        $and: [ { age: { $gt : 35 } }, { age : { $lt: 46 } } ]
    }).then(res => {c3 = res;console.log(c3); c_array.push(c3)});
    Customer.count({
        $and: [ { age: { $gt : 45 } }, { age : { $lt: 56 } } ]
    }).then(res => {c4 = res;console.log(c4); c_array.push(c4)});
    Customer.count({
        $and: [ { age: { $gt : 55 } }, { age : { $lt: 66 } } ]
    }).then(res => {
        c5 = res;
        console.log(c5);
        c_array.push(c5); 
        BarChart.updateOne(
            {},
            {$set: {data: c_array}}
        ).then(console.log("Updated"));
    }).catch(err => res.status(500).json('Error: '+ err));
})

// router.route('/add').put((req, res) => {
//     const label = req.body.label;
//     const data = req.body.data;
//     console.log(label,data)
//     const newBarChart = new BarChart({
//         label,
//         data
//     });

//     newBarChart.save()
//     .then(() => res.json('line data added!'))
//     .catch(err => {res.status(500).json('Error: ' + err);
//     console.log("Error is here")});
// });

router.route('/delete/:id').delete((req, res) => {
    id = req.params.id;
    console.log(id)
    BarChart.deleteOne({_id : id}).then(
        () => {
            res.send('Deleted')
        }
    )
})



module.exports = router;
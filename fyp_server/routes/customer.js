const router = require('express').Router();
let Customer = require('../models/customer.model');

router.route('/').get((req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(500).json('Error: '+ err));
});

router.route('/add').post((req, res) => {
    const label = req.body.name;
    const descriptor = req.body.descriptor;
    const picture = req.body.url;
    const age = req.body.age;
    const gender = req.body.gender;
    const expression = req.body.expr;
    const visits = req.body.visit;
    //console.log(label,descriptor)
    const newCustomer = new Customer({
      label,
      descriptor,
      picture,
      age,
      gender,
      expression,
      visits
    });

    newCustomer.save()
    .then(() => res.json('Customer added!'))
    .catch(err => {res.status(500).json('Error: ' + err);console.log("Error is here")});
});

router.route('/:id').get((req, res) => {
  Customer.findById(req.params.id)
    .then(customer => res.json(customer))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Customer.findById(req.params.id)
    .then(exercise => {
      customer.label = req.body.name;
      customer.descriptor = req.body.descriptor;
      customer.picture = req.body.url;
      customer.age = req.body.age;
      customer.gender = req.body.gender;
      customer.expression = req.body.expr;

      customer.save()
        .then(() => res.json('Customer updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/incvisit/:name').put((req, res) => {
  Customer.findOneAndUpdate(
    { "label": req.params.name },
    { $inc: { "visits" : 1 } }
  ).catch(err => res.status(500).json('Error: '+ err));
});

module.exports = router;
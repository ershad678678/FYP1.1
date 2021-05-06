const router = require('express').Router();
let Purchase = require('../models/purchases.model');

router.route('/').get((req, res) => {
    Purchase.find()
        .then(purchases => res.json(purchases))
        .catch(err => res.status(500).json('Error: '+ err));
});

router.route('/add').post((req, res) => {
    const name = req.body.id;
    const items = req.body.purchase;
    const newPurchase = new Purchase({
      name,
      items
    });

    newPurchase.save()
    .then(() => res.json('Purchase added!'))
    .catch(err => {res.status(500).json('Error: ' + err);console.log("Error is here")});
});

router.route('/:id').get((req, res) => {
  Purchase.findById(req.params.id)
    .then(purchase => res.json(purchase))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/purchases/update/:id').post((req, res) => {
  Purchase.findById(req.params.id)
    .then(exercise => {
      purchase.name = req.body.id;
      purchase.items = req.body.purchase;
      //customer.age = Number(req.body.duration);

      purchase.save()
        .then(() => res.json('Purchase updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(500).json('Error: ' + err));
});

module.exports = router;
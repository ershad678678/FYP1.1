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

router.route('/:name').get((req, res) => {
  Purchase.find( { "name": req.params.name } )
    .then(purchase => res.json(purchase))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:name').put((req, res) => {
  const query = { "name": req.params.name };
  const replacement = { "name": req.body.id , "items": req.body.purchase };
  Purchase.findOneAndReplace(query, replacement, {upsert:true})
    .catch(err => res.status(500).json('Error: ' + err));
});

module.exports = router;
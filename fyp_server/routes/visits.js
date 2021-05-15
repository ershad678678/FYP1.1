const router = require('express').Router();
let Visits = require('../models/visits.model');
let Purchase = require('../models/purchases.model');

router.route('/').get((req, res) => {
    Visits.find({})
        .then(data => res.json(data))
        .catch(err => res.status(500).json('Error: '+ err));
});

router.route('/add').post((req,res) => {
  const name = req.body.name;
  const gender = req.body.gender;
  const visit_no = req.body.visitNo;
  const date = req.body.dateToday; 
  const time = req.body.timeNow; 
  const expression = req.body.expression;
  const purchase = req.body.transaction;
  const newVisit = new Visits({
    name,
    gender,
    expression,
    visit_no,
    purchase,
    date,
    time
  });
  newVisit.save()
  .then(() => res.json('Visit Info added!'))
  .catch(err => {res.status(500).json('Error: ' + err);console.log("Error is in Visit Info")});
})

router.route('/delete/:id').delete((req, res) => {
  id = req.params.id;
  console.log(id)
  Visits.deleteOne({_id : id}).then(
      () => {
          res.send('Deleted')
      }
  )
})

module.exports = router;
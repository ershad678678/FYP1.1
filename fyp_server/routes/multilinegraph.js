const router = require('express').Router();
const { MultilineChart } = require('@material-ui/icons');
let MultiLineGraph = require('../models/multilinegraph.model.js');
let Visits = require('../models/visits.model');

router.route('/').get((req, res) => {
    MultiLineGraph.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(500).json('Error: '+ err));
});

router.route('/add').put((req, res) => {
    let exp1 = [];
    let exp2 = [];
    let exp3 = [];
    let exp4 = [];
    let exp5 = [];
    let exp6 = [];
    let exp7 = [];
    
    /* For neutral expression */
    Visits.count({
        $and: [ { expression: 'neutral' }, { time: {$regex: /^8:\d\d:\d\d AM$/} } ]
    }).then(res => exp1.push(res));
    Visits.count({
        $and: [ { expression: 'neutral' }, { time: {$regex: /^9:\d\d:\d\d AM$/} } ]
    }).then(res => exp1.push(res));
    Visits.count({
        $and: [ { expression: 'neutral' }, { time: {$regex: /^10:\d\d:\d\d AM$/} } ]
    }).then(res => exp1.push(res));
    Visits.count({
        $and: [ { expression: 'neutral' }, { time: {$regex: /^11:\d\d:\d\d AM$/} } ]
    }).then(res => exp1.push(res));
    Visits.count({
        $and: [ { expression: 'neutral' }, { time: {$regex: /^12:\d\d:\d\d PM$/} } ]
    }).then(res => exp1.push(res));
    Visits.count({
        $and: [ { expression: 'neutral' }, { time: {$regex: /^1:\d\d:\d\d PM$/} } ]
    }).then(res => exp1.push(res));
    Visits.count({
        $and: [ { expression: 'neutral' }, { time: {$regex: /^2:\d\d:\d\d PM$/} } ]
    }).then(res => exp1.push(res));
    Visits.count({
        $and: [ { expression: 'neutral' }, { time: {$regex: /^3:\d\d:\d\d PM$/} } ]
    }).then(res => exp1.push(res));
    Visits.count({
        $and: [ { expression: 'neutral' }, { time: {$regex: /^4:\d\d:\d\d PM$/} } ]
    }).then(res => exp1.push(res));
    Visits.count({
        $and: [ { expression: 'neutral' }, { time: {$regex: /^5:\d\d:\d\d PM$/} } ]
    }).then(res => exp1.push(res));
    Visits.count({
        $and: [ { expression: 'neutral' }, { time: {$regex: /^6:\d\d:\d\d PM$/} } ]
    }).then(res => exp1.push(res));

    /* For happy expression */
    Visits.count({
        $and: [ { expression: 'happy' }, { time: {$regex: /^8:\d\d:\d\d AM$/} } ]
    }).then(res => exp2.push(res));
    Visits.count({
        $and: [ { expression: 'happy' }, { time: {$regex: /^9:\d\d:\d\d AM$/} } ]
    }).then(res => exp2.push(res));
    Visits.count({
        $and: [ { expression: 'happy' }, { time: {$regex: /^10:\d\d:\d\d AM$/} } ]
    }).then(res => exp2.push(res));
    Visits.count({
        $and: [ { expression: 'happy' }, { time: {$regex: /^11:\d\d:\d\d AM$/} } ]
    }).then(res => exp2.push(res));
    Visits.count({
        $and: [ { expression: 'happy' }, { time: {$regex: /^12:\d\d:\d\d PM$/} } ]
    }).then(res => exp2.push(res));
    Visits.count({
        $and: [ { expression: 'happy' }, { time: {$regex: /^1:\d\d:\d\d PM$/} } ]
    }).then(res => exp2.push(res));
    Visits.count({
        $and: [ { expression: 'happy' }, { time: {$regex: /^2:\d\d:\d\d PM$/} } ]
    }).then(res => exp2.push(res));
    Visits.count({
        $and: [ { expression: 'happy' }, { time: {$regex: /^3:\d\d:\d\d PM$/} } ]
    }).then(res => exp2.push(res));
    Visits.count({
        $and: [ { expression: 'happy' }, { time: {$regex: /^4:\d\d:\d\d PM$/} } ]
    }).then(res => exp2.push(res));
    Visits.count({
        $and: [ { expression: 'happy' }, { time: {$regex: /^5:\d\d:\d\d PM$/} } ]
    }).then(res => exp2.push(res));
    Visits.count({
        $and: [ { expression: 'happy' }, { time: {$regex: /^6:\d\d:\d\d PM$/} } ]
    }).then(res => exp2.push(res));

    /* For sad expression */
    Visits.count({
        $and: [ { expression: 'sad' }, { time: {$regex: /^8:\d\d:\d\d AM$/} } ]
    }).then(res => exp3.push(res));
    Visits.count({
        $and: [ { expression: 'sad' }, { time: {$regex: /^9:\d\d:\d\d AM$/} } ]
    }).then(res => exp3.push(res));
    Visits.count({
        $and: [ { expression: 'sad' }, { time: {$regex: /^10:\d\d:\d\d AM$/} } ]
    }).then(res => exp3.push(res));
    Visits.count({
        $and: [ { expression: 'sad' }, { time: {$regex: /^11:\d\d:\d\d AM$/} } ]
    }).then(res => exp3.push(res));
    Visits.count({
        $and: [ { expression: 'sad' }, { time: {$regex: /^12:\d\d:\d\d PM$/} } ]
    }).then(res => exp3.push(res));
    Visits.count({
        $and: [ { expression: 'sad' }, { time: {$regex: /^1:\d\d:\d\d PM$/} } ]
    }).then(res => exp3.push(res));
    Visits.count({
        $and: [ { expression: 'sad' }, { time: {$regex: /^2:\d\d:\d\d PM$/} } ]
    }).then(res => exp3.push(res));
    Visits.count({
        $and: [ { expression: 'sad' }, { time: {$regex: /^3:\d\d:\d\d PM$/} } ]
    }).then(res => exp3.push(res));
    Visits.count({
        $and: [ { expression: 'sad' }, { time: {$regex: /^4:\d\d:\d\d PM$/} } ]
    }).then(res => exp3.push(res));
    Visits.count({
        $and: [ { expression: 'sad' }, { time: {$regex: /^5:\d\d:\d\d PM$/} } ]
    }).then(res => exp3.push(res));
    Visits.count({
        $and: [ { expression: 'sad' }, { time: {$regex: /^6:\d\d:\d\d PM$/} } ]
    }).then(res => exp3.push(res));

    /* For angry expression */
    Visits.count({
        $and: [ { expression: 'angry' }, { time: {$regex: /^8:\d\d:\d\d AM$/} } ]
    }).then(res => exp4.push(res));
    Visits.count({
        $and: [ { expression: 'angry' }, { time: {$regex: /^9:\d\d:\d\d AM$/} } ]
    }).then(res => exp4.push(res));
    Visits.count({
        $and: [ { expression: 'angry' }, { time: {$regex: /^10:\d\d:\d\d AM$/} } ]
    }).then(res => exp4.push(res));
    Visits.count({
        $and: [ { expression: 'angry' }, { time: {$regex: /^11:\d\d:\d\d AM$/} } ]
    }).then(res => exp4.push(res));
    Visits.count({
        $and: [ { expression: 'angry' }, { time: {$regex: /^12:\d\d:\d\d PM$/} } ]
    }).then(res => exp4.push(res));
    Visits.count({
        $and: [ { expression: 'angry' }, { time: {$regex: /^1:\d\d:\d\d PM$/} } ]
    }).then(res => exp4.push(res));
    Visits.count({
        $and: [ { expression: 'angry' }, { time: {$regex: /^2:\d\d:\d\d PM$/} } ]
    }).then(res => exp4.push(res));
    Visits.count({
        $and: [ { expression: 'angry' }, { time: {$regex: /^3:\d\d:\d\d PM$/} } ]
    }).then(res => exp4.push(res));
    Visits.count({
        $and: [ { expression: 'angry' }, { time: {$regex: /^4:\d\d:\d\d PM$/} } ]
    }).then(res => exp4.push(res));
    Visits.count({
        $and: [ { expression: 'angry' }, { time: {$regex: /^5:\d\d:\d\d PM$/} } ]
    }).then(res => exp4.push(res));
    Visits.count({
        $and: [ { expression: 'angry' }, { time: {$regex: /^6:\d\d:\d\d PM$/} } ]
    }).then(res => exp4.push(res));

    /* For fearful expression */
    Visits.count({
        $and: [ { expression: 'fearful' }, { time: {$regex: /^8:\d\d:\d\d AM$/} } ]
    }).then(res => exp5.push(res));
    Visits.count({
        $and: [ { expression: 'fearful' }, { time: {$regex: /^9:\d\d:\d\d AM$/} } ]
    }).then(res => exp5.push(res));
    Visits.count({
        $and: [ { expression: 'fearful' }, { time: {$regex: /^10:\d\d:\d\d AM$/} } ]
    }).then(res => exp5.push(res));
    Visits.count({
        $and: [ { expression: 'fearful' }, { time: {$regex: /^11:\d\d:\d\d AM$/} } ]
    }).then(res => exp5.push(res));
    Visits.count({
        $and: [ { expression: 'fearful' }, { time: {$regex: /^12:\d\d:\d\d PM$/} } ]
    }).then(res => exp5.push(res));
    Visits.count({
        $and: [ { expression: 'fearful' }, { time: {$regex: /^1:\d\d:\d\d PM$/} } ]
    }).then(res => exp5.push(res));
    Visits.count({
        $and: [ { expression: 'fearful' }, { time: {$regex: /^2:\d\d:\d\d PM$/} } ]
    }).then(res => exp5.push(res));
    Visits.count({
        $and: [ { expression: 'fearful' }, { time: {$regex: /^3:\d\d:\d\d PM$/} } ]
    }).then(res => exp5.push(res));
    Visits.count({
        $and: [ { expression: 'fearful' }, { time: {$regex: /^4:\d\d:\d\d PM$/} } ]
    }).then(res => exp5.push(res));
    Visits.count({
        $and: [ { expression: 'fearful' }, { time: {$regex: /^5:\d\d:\d\d PM$/} } ]
    }).then(res => exp5.push(res));
    Visits.count({
        $and: [ { expression: 'fearful' }, { time: {$regex: /^6:\d\d:\d\d PM$/} } ]
    }).then(res => exp5.push(res));

    /* For disgusted expression */
    Visits.count({
        $and: [ { expression: 'disgusted' }, { time: {$regex: /^8:\d\d:\d\d AM$/} } ]
    }).then(res => exp6.push(res));
    Visits.count({
        $and: [ { expression: 'disgusted' }, { time: {$regex: /^9:\d\d:\d\d AM$/} } ]
    }).then(res => exp6.push(res));
    Visits.count({
        $and: [ { expression: 'disgusted' }, { time: {$regex: /^10:\d\d:\d\d AM$/} } ]
    }).then(res => exp6.push(res));
    Visits.count({
        $and: [ { expression: 'disgusted' }, { time: {$regex: /^11:\d\d:\d\d AM$/} } ]
    }).then(res => exp6.push(res));
    Visits.count({
        $and: [ { expression: 'disgusted' }, { time: {$regex: /^12:\d\d:\d\d PM$/} } ]
    }).then(res => exp6.push(res));
    Visits.count({
        $and: [ { expression: 'disgusted' }, { time: {$regex: /^1:\d\d:\d\d PM$/} } ]
    }).then(res => exp6.push(res));
    Visits.count({
        $and: [ { expression: 'disgusted' }, { time: {$regex: /^2:\d\d:\d\d PM$/} } ]
    }).then(res => exp6.push(res));
    Visits.count({
        $and: [ { expression: 'disgusted' }, { time: {$regex: /^3:\d\d:\d\d PM$/} } ]
    }).then(res => exp6.push(res));
    Visits.count({
        $and: [ { expression: 'disgusted' }, { time: {$regex: /^4:\d\d:\d\d PM$/} } ]
    }).then(res => exp6.push(res));
    Visits.count({
        $and: [ { expression: 'disgusted' }, { time: {$regex: /^5:\d\d:\d\d PM$/} } ]
    }).then(res => exp6.push(res));
    Visits.count({
        $and: [ { expression: 'disgusted' }, { time: {$regex: /^6:\d\d:\d\d PM$/} } ]
    }).then(res => exp6.push(res));

    /* For surprised expression */
    Visits.count({
        $and: [ { expression: 'surprised' }, { time: {$regex: /^8:\d\d:\d\d AM$/} } ]
    }).then(res => exp7.push(res));
    Visits.count({
        $and: [ { expression: 'surprised' }, { time: {$regex: /^9:\d\d:\d\d AM$/} } ]
    }).then(res => exp7.push(res));
    Visits.count({
        $and: [ { expression: 'surprised' }, { time: {$regex: /^10:\d\d:\d\d AM$/} } ]
    }).then(res => exp7.push(res));
    Visits.count({
        $and: [ { expression: 'surprised' }, { time: {$regex: /^11:\d\d:\d\d AM$/} } ]
    }).then(res => exp7.push(res));
    Visits.count({
        $and: [ { expression: 'surprised' }, { time: {$regex: /^12:\d\d:\d\d PM$/} } ]
    }).then(res => exp7.push(res));
    Visits.count({
        $and: [ { expression: 'surprised' }, { time: {$regex: /^1:\d\d:\d\d PM$/} } ]
    }).then(res => exp7.push(res));
    Visits.count({
        $and: [ { expression: 'surprised' }, { time: {$regex: /^2:\d\d:\d\d PM$/} } ]
    }).then(res => exp7.push(res));
    Visits.count({
        $and: [ { expression: 'surprised' }, { time: {$regex: /^3:\d\d:\d\d PM$/} } ]
    }).then(res => exp7.push(res));
    Visits.count({
        $and: [ { expression: 'surprised' }, { time: {$regex: /^4:\d\d:\d\d PM$/} } ]
    }).then(res => exp7.push(res));
    Visits.count({
        $and: [ { expression: 'surprised' }, { time: {$regex: /^5:\d\d:\d\d PM$/} } ]
    }).then(res => exp7.push(res));
    Visits.count({
        $and: [ { expression: 'surprised' }, { time: {$regex: /^6:\d\d:\d\d PM$/} } ]
    }).then(res => {
        exp7.push(res);
        MultiLineGraph.updateOne(
            {},
            {$set: {line1data: exp1 , line2data: exp2 , line3data: exp3 , line4data: exp4 , line5data: exp5 , line6data: exp6 , line7data: exp7} }
        ).then(console.log("Updated multilinegraph"));
    }).catch(err => res.status(500).json('Error: '+ err));
});

router.route('/delete/:id').delete((req, res) => {
    id = req.params.id;
    console.log(id)
    MultiLineGraph.deleteOne({_id : id}).then(
        () => {
            res.send('Deleted')
        }
    )
})

router.route('/deleteall').delete((req, res) => {
    MultiLineGraph.deleteMany({}).then(
        () => {
            res.send('Deleted')
        }
    )
})

module.exports = router;
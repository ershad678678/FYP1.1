const router = require('express').Router();
const Purchase = require('../models/purchases.model');
const Recommendation = require('../models/recommendations.model');
let persons = [];
let Data = [];
var g = require('ger');
var esm = new g.MemESM()
var ger = new g.GER(esm);
var no_of_recomm = 5;

router.route('/:name').get((req, res) => {
    Recommendation.find( { "name": req.params.name } )
      .then(recom => res.json(recom))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/calc').put((req, res) => {
    Purchase.find()
        .then(res => {
            //console.log(res);
            ger.initialize_namespace('items')
            .then(() => {
                res.forEach(rs => {
                    persons.push(rs.name);
                    rs.items.forEach(itm => {
                        ger.events([
                            {
                              namespace: 'items',
                              person: rs.name,
                              action: 'likes',
                              thing: itm.item,
                              expires_at: '2021-05-29'
                            }]);
                    })
                })
            })})
        .then(ans => res.json('Calculated!'))
        .catch(err => res.status(500).json('Error: '+ err));
});

router.route('/add').put((req,res) => {
    persons.forEach(pers => {
        let name = pers;
        let recomm_arr = [];
        var pair;
        ger.recommendations_for_person('items', name, {
                actions: {likes: 1},
                //"similarity_search_size": 50,
                "neighbourhood_size": 20,
                "recommendations_per_neighbour": 5,
                //"filter_previous_actions": ["watch"],
                //"event_decay_rate": 1.05,
                //"time_until_expiry": 180
            })
            .then( (recommendations) => {
                let pool = recommendations.recommendations;
                let neighbour = recommendations.neighbourhood;
                let ind_recomm = [];
                let similar_customers = [];
                for (let i=0; i < no_of_recomm; i++){
                    //console.log(pool[i].thing);
                    ind_recomm.push(pool[i].thing);
                    similar_customers.push(Object.keys(neighbour)[i]);
                }
                ind_recomm.forEach(itm_name => {
                    let obj = {
                        item: itm_name,
                        img: "http://localhost:10000/image/"+itm_name+".jpg"
                    }
                    recomm_arr.push(obj);
                });
                pair = {
                    name: name,
                    recommendation: recomm_arr,
                    persons: similar_customers
                };
                Data.push(pair);
            })
    })
})

router.route('/post').post(req => {
    Recommendation.remove({})
    .then(() => {
        Recommendation.insertMany(Data, forceServerObjectId=true)
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
    
})

module.exports = router;
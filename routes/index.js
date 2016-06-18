'use strict';

const router = require('express').Router();
const getCurrentVisitCounter = require('../helpers/dbHelpers').getCurrentVisitCounter;
const updateCurrentVisitCounter = require('../helpers/dbHelpers').updateCurrentVisitCounter;

router.get('/', (req, res, next) => {
  getCurrentVisitCounter(function (counter) {
    res.render('index', {'visits': counter.count});
  })
});

router.post('/update', (req, res, next) => {
  const cookieCount = req.body['cookie_count'];
  getCurrentVisitCounter(function(counter){
    updateCurrentVisitCounter(counter, cookieCount, (err, result) => {
      if (err) throw err;
      res.send(200);
    })
  })
});

module.exports = router;
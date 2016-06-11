'use strict';

const express = require('express');
const router = express.Router();
const rethink = require('rethinkdb');
const getCurrentVisitCounter = require('../dbHelpers').getCurrentVisitCounter;

router.get('/', (req, res, next) => {
  getCurrentVisitCounter(function (counter) {
    res.render('index', {'visits': counter.count});
  })
});


router.post('/update', (req, res, next) => {
  const cookieCount = req.body['cookie_count'];
  getCurrentVisitCounter(function(counter){
    updateVisitCounter(counter, cookieCount, (err, result) => {
      if (err) throw err;
      res.send(200);
    })
  })
});


module.exports = router;


function updateVisitCounter(counter, cookieCount, callback) {
  let connectToDb = rethink.connect(
      {
        host: 'dokku-rethinkdb-monster',
        port: 28015
      }
  );

  console.log('Preparing to update visit counter by ', cookieCount);
  counter.count += cookieCount;

  connectToDb
      .then(conn => {
        rethink.table('visits')
            .update(counter)
            .run(conn, (err, result) => {
                  if (err) throw err;
                  if (callback && typeof callback === 'function') {
                    callback();
                  }
                }
            )
      })
      .error(err => {
        throw err
      });
}
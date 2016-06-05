'use strict';

const router = require('express').Router();
const rethink = require('rethinkdb');

router.get('/', (req, res, next) => {
  getCurrentVisitCounter(function (counter) {
    res.render('index', {'visits': counter.count});
    updateVisitCounter(counter);
  });

module.exports = router;

function getCurrentVisitCounter(callback) {
  let connectToDb = rethink.connect(
      {
        host: 'dokku-rethinkdb-monster',
        port: 28015
      }
  );

  connectToDb
      .then(conn => {
        rethink.table('visits')
            .get(1)
            .run(conn, (err, result) => {
              if (err) throw err;
              callback(result);
            }
        )
      })
      .error(err => {
        throw err
      });
}

function updateVisitCounter(counter) {
  let connectToDb = rethink.connect(
      {
        host: 'dokku-rethinkdb-monster',
        port: 28015
      }
  );

  counter.count++;

  connectToDb
      .then(conn => {
        rethink.table('visits')
            .update(counter)
            .run(conn, (err, result) => {
              if (err) throw err;
            }
        )
      })
      .error(err => {
        throw err
      });
}
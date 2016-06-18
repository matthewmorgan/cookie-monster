'use strict';

const rethink = require('rethinkdb');

module.exports = {
  getCurrentVisitCounter:  (callback) => {
    const connectToDb = rethink.connect(
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
  },
  updateCurrentVisitCounter: (counter, cookieCount, callback) => {
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
};



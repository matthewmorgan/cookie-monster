'use strict';

const rethink = require('rethinkdb');

module.exports = {
  getCurrentVisitCounter: function (callback) {
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
  }
};



var db = require('./databaseConfig.js');

var actorDB = {
      // Endpoint 1 
      getActor: function (actor_id, callback) {
            var conn = db.getConnection();
            conn.connect(function (err) {
                  if (err) {
                        console.log(err);
                        return callback(err, null);
                  }
                  else {
                        console.log("Connected!");
                        var sql = 'SELECT actor_id, first_name, last_name FROM actor WHERE actor_id = ?';
                        conn.query(sql, [actor_id], (err, result) => {
                              conn.end();
                              if (err) {
                                    console.log(err);
                                    return callback(err, null);
                              } else {
                                    return callback(null, result);
                              }
                        });
                  }

            });
      },

      // Endpoint 3 

      addActor: function (first_name, last_name, callback) {

            var conn = db.getConnection();
            conn.connect(function (err) {
                  if (err) {
                        console.log(err);
                        return callback(err, null);
                  }
                  else {
                        console.log("Connected!");

                        var sql = 'Insert into actor(first_name, last_name) values(?,?)';
                        conn.query(sql, [first_name,last_name], function (err, result) {
                              conn.end();

                              if (err) {
                                    console.log(err);
                                    return callback(err, null);

                              } else {
                                    return callback(null, result.insertId)
                              }
                        });

                  }

            });

      },
}


module.exports = actorDB
var mysql = require('mysql');
var dbconnect = {
      getConnection: function () {
            var conn = mysql.createConnection({
                  host: "localhost",
                  user: "root",
                  password: "pa$$woRD123",
                  database: "bed_dvd_root"
            });
            return conn;
      }
};
module.exports = dbconnect

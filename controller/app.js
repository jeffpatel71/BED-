var express = require('express');
var app = express();
var actor = require('../model/actor.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());// parse application/json
app.use(urlencodedParser); // parse application/x-www-form-urlencoded

// Endpoint 1 
app.get('/api/actor/:actor_id', function (req, res) {
      var id = req.params.actor_id;

      actor.getActor(id, function (err, result) {
            if (!err) {
                  if (result === null) {
                        res.status(204).send("No Content. Record of given actor_id cannot be found.")
                  }
                  else {
                        res.status(200).send(result);
                  }
            } else {
                  res.status(500).send(res.type('json').status(500).send(JSON.stringify({"error_msg":"Internal server error"})));
            }
      });

});

app.post('/api/actor', function (req, res) {

      var first_name = req.body.first_name;
      var last_name = req.body.last_name;

      user.addUser(first_name, last_name, function (err, result) {
            if (!err) {
                  console.log(result);
                  res.status(200).send(result + ' record inserted');
            } else {
                  res.send(err.statusCode);

            }
      });

});

// Endpoint 3

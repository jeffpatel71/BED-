var express = require('express');
var app = express();
var actor = require('../model/actor.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());// parse application/json
app.use(urlencodedParser); // parse application/x-www-form-urlencoded
const re = /^[A-Za-z0-9 .,'!&]+$/;

// Endpoint 1 
app.get('/actor/:actor_id', function (req, res) {
      var id = req.params.actor_id;
      if(id = NaN) {
            res.status(500).send(res.type('json').status(500).send(JSON.stringify({"error_msg":"Internal server error"})));
      }
      actor.getActor(id, function (err, result) {
            if (!err) {
                  if (result.length == 0) {
                        res.status(204).send("No Content. Record of given actor_id cannot be found.")
                  }
                  else {
                        res.status(200).send(result);
                  }
            } else {
                  res.type('json').status(500).send(JSON.stringify({"error_msg":"Internal server error"}))
            }
      });

});

// Endpoint 3
app.post('/actors', function (req, res) {

      var first_name = req.body.first_name;
      var last_name = req.body.last_name

      if(!first_name || !last_name){
            return res.type('json').status(400).send(JSON.stringify({"error_msg":"missing data"}))
      }
      
      else if(!isNaN(first_name)|| !isNaN(last_name)){
            return res.type('json').status(500).send(JSON.stringify({"error_msg":"Internal server error"}))
      }
      
      actor.addActor (first_name, last_name, function (err, result) {
            if (!err) {
                  return res.type('json').status(201).send(JSON.stringify({"actor_id": `${result}`}))
            } else {
                  return res.type('json').status(500).send(JSON.stringify({"error_msg":"Internal server error"}));
            }
      });
});

module.exports = app
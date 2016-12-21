var pg = require('pg');

// connection string
var un = "jainsambhav"; // aws db username
var pw = "jainsambhav"; // aws db password
var db = 'hall'; // aws db database name
var ep = 'abc.cucawtfwbfkq.us-west-2.rds.amazonaws.com:5432'; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;

var five = require("johnny-five");
var board = new five.Board();



board.on("ready", function() {

  this.pinMode(2, five.Pin.INPUT);

  var sensor = new five.Sensor.Digital({pin: 2, freq: 60000});
  sensor.on("data", function() {
  		// console.log('Detected, ' + Date());
  	// var query = "SELECT * FROM trackWorkTime;";
	// var createTableQuery = "CREATE TABLE trackWorkTime (dateCreated timestamp DEFAULT current_timestamp, detected boolean);"
	var insertIntoQuery = "INSERT INTO trackWorkTime VALUES (DEFAULT, " + (this.value == true) + ");"

	pg.connect(conString, function(err, client, done) {
	    if (err) {
	        return console.error('error fetching client from pool', err);
	    }

	    client.query(insertIntoQuery, function(err, result) {
	        //call `done()` to release the client back to the pool
	        done();

	        if (err) {
	            return console.error('error running query', err);
	        }
	        console.log(result);
    });

});
  }); 

});


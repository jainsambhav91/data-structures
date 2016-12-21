var pg = require('pg');

// connection string
var un = "jainsambhav"; // aws db username
var pw = "jainsambhav"; // aws db password
var db = 'hall'; // aws db database name
var ep = 'abc.cucawtfwbfkq.us-west-2.rds.amazonaws.com:5432'; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;

var query = "SELECT *  FROM trackWorkTime ";
var createTableQuery = "CREATE TABLE trackWorkTime (dateCreated timestamp DEFAULT current_timestamp, detected boolean);"
var insertIntoQuery = "INSERT INTO trackWorkTime VALUES (DEFAULT, this.value);"

pg.connect(conString, function(err, client, done) {
    if (err) {
        return console.error('error fetching client from pool', err);
    }

    client.query(query, function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if (err) {
            return console.error('error running query', err);
        }
        console.log(result.rows);
    });

});

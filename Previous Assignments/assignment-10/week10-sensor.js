var pg = require('pg');
var http = require('http');
var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());

app.set('port', 8585);

// connection string
var un = "jainsambhav"; // aws db username
var pw = "jainsambhav"; // aws db password
var db = 'hall'; // aws db database name
var ep = 'abc.cucawtfwbfkq.us-west-2.rds.amazonaws.com:5432'; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;
// console.log(conString);

// Select
//      convert(varchar,
//          convert(date, IN_Date, 103),
//      101)

var query = "SELECT " +
            " count(detected) as minutesWorked," +
            " date(dateCreated) as day " +
            " FROM trackWorkTime" + 
            " WHERE detected = FALSE" +
            " GROUP BY  day " + 
            " ORDER BY day";

// var query = "SELECT * " +
//             // " count(detected) as minutesWorked," +
//             // " cast(date(dateCreated) as text) as date" +   
            // " FROM trackWorkTime" ; 
//             // " WHERE detected = FALSE" +
//             // " GROUP BY date(dateCreated) " + 
//             // " ORDER BY date";



            
 // " GROUP BY EXTRACT(DAY FROM dateCreated) " +
 
 
var runQ = function(q,c){
        pg.connect(conString, function(err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }

            client.query(q, function(err, result) {
                //call `done()` to release the client back to the pool
                done();
                c(err,result);
            });
        })
    }



function getData(callback){
    runQ(query,function(e,r){
        callback(r.rows);
        });
}


app.get("/",function(request, response) {
    getData(function(d){
      response.end(JSON.stringify(d));
    });
});

app.listen("8081", process.env.IP, function() {
  console.log('Node app is running on host -- ' + process.env.IP + ':'+'8081');
});
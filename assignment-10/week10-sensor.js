var pg = require('pg');
var http = require('http');
var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());

app.set('port', 8585);

// connection string
var un = "agaase"; // aws db username
var pw = "abcd1234"; // aws db password
var db = 'postgres'; // aws db database name
var ep = 'bestgpsproject.c55t6l9g9dv3.us-west-2.rds.amazonaws.com'; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;
// console.log(conString);

var query = "SELECT * FROM trackWorkTime";

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
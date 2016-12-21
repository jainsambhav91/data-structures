// Require file system module
var fs = require('fs');

// Import and parse output from previous assignment into JSON
var latlong = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/assignment-3/lat-long.txt'));

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/aameetings';

// Retrieve
var MongoClient = require('mongodb').MongoClient; // npm install mongodb

MongoClient.connect(url, function(err, db) {
    if (err) {
        return console.dir(err);
    }
    var collection = db.collection('meetings');
    
    // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
    for (var i = 0; i < latlong.length; i++) {
        collection.insert({
            address: latlong[i].address,
            latLong: latlong[i].latLong
        });
    }
    
    db.close();
});
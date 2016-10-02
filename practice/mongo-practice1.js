// IN THE MONGO SHELL: 
//   CREATE DATABASE citibike AND SWITCH TO IT WITH: 
//      use citibike
//   CREATE COLLECTION stations WITH: 
//      db.createCollection('stations')
//   QUERY THE ENTIRE stations COLLECTION WITH:
//      db.stations.find()
//   COUNT THE NUMBER OF DOCUMENTS IN THE stations COLLECTION WITH:
//      db.stations.find().count()

var request = require('request');

request('https://www.citibikenyc.com/stations/json', function(error, response, body) {
    var stationData = JSON.parse(body);
    
    var url = 'mongodb://' + process.env.IP + ':27017/citibike';
    
    var MongoClient = require('mongodb').MongoClient;
    
    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}
        var collection = db.collection('stations');

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        for (var i=0; i < stationData.stationBeanList.length; i++) {
            collection.insert(stationData.stationBeanList[i]);
            }
        db.close();

    }); //MongoClient.connect
    
}); //Request

// db.stations.remove(false) or db.stations.drop() -> To remove the data in collection before running the code again
// db.stations.find({ statusValue  : { $ne : "In Service"}})
var express = require('express');
var request = require('request');
var cors = require('cors');


var app = express();

app.use(cors());

function getAAdata(){

  //mongo db address
  var url = 'mongodb://' + process.env.IP + ':27017/aameetings';
  
 var MongoClient = require('mongodb').MongoClient;
  
  return {
    
    fetchData : function(callback){
      MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}
        var cursor = db.collection('meetingtimes').find();
        var data = [];
        cursor.each(function(err, doc) {
            if (doc != null) {
                console.log(doc);
               data.push({
                "address" : doc.address,
                "title" : doc.title,
                "timings" : doc.timings,
                "day" : doc.day,
                "type" : doc.type,
                "interest" : doc.interest,
                "location" : doc.location
               });
            } else {
               db.close();
               callback(data);
            }
         });
        
      });
    }
  }
}

var AAData = getAAdata();

app.get("/",function(request, response) {
    AAData.fetchData(function(data){
    	//Returning back the data to the request in json format.
        response.end(JSON.stringify(data));
    });
});
//Starting the server
app.listen(process.env.PORT, process.env.IP, function() {
  console.log('Node app is running on host -- ' + process.env.IP + ':'+process.env.PORT);
});

var express = require('express');
var request = require('request');
var cors = require('cors');


//Express makes it super easy to create a server and allow routing
var app = express();

//Using cors to allow request from any URL
app.use(cors());

//Setting the port where the server will listen to
// app.set('port', 8181);

function getAAdata(){

  //This is where my mongo db resides
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

//rendering the home page
app.get("/",function(request, response) {
    AAData.fetchData(function(data){
    	//This is how we return back something to a request. 
    	//In this case Iam just returning the string representation of my json data.
        response.end(JSON.stringify(data));
    });
});
//Starting the server
app.listen(process.env.PORT, process.env.IP, function() {
  console.log('Node app is running on host -- ' + process.env.IP + ':'+process.env.PORT);
});

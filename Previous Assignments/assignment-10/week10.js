var express = require('express');
var request = require('request');
var cors = require('cors');


// Current time: converting GMT to EST
var gmt = new Date ();
var est = new Date ( gmt );
est.setHours ( gmt.getHours() -5 );
// console.log(est);

// extracting hours from EST
var estHour = est.getHours();
// console.log("hour: " + estHour);

// extracting minutes from EST
var estMin = est.getMinutes();
// console.log("minutes: " + estMin);

// appending EST minutes and hours >> converting into EST 24 Hour format
var est24HrString = String(estHour) + String(estMin);
var est24Hr = parseInt(est24HrString);
// console.log("time: " + est24Hr +  " ------- check if integer: " + (parseInt(est24Hr) + 20));


var days = [ 'Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];
// console.log(days[days.indexOf('Mondays') + 1]);

var currentDay = days[est.getUTCDay()];
// console.log("currentDay: " + currentDay);


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
        var cursor = db.collection('meetingtimes').find(
            
                { $or :
                    [
                        { $and : 
                            [
                                {day : 'Saturdays'},
                                {startTime : { $gte :  est24Hr  }},
                                {startTime: {$lte : 2400}}
                             ]
                        },
                        
                        { $and : 
                            [
                                // {day : (days.indexOf(currentDay) + 1)>6 ? days[0] : days[days.indexOf(currentDay) + 1]},
                                {day : 'Sundays'},
                                {startTime: {$gte : 0}},
                                {startTime: {$lte : 400}}
                             ]
                        }
                    ]
                
                }     
            
            
            //   { $or :
            //         [
            //             { $and : 
            //                 [
            //                     {day : 'Tuesdays'},
            //                     // {startTime : { $gte :  est24Hr  }},
            //                     // {startTime: {$lte : 2400}}
            //                  ]
            //             },
                        
            //             { $and : 
            //                 [
            //                     // {day : (days.indexOf(currentDay) + 1)>6 ? days[0] : days[days.indexOf(currentDay) + 1]},
            //                     // {startTime: {$gte : 0}},
            //                     // {startTime: {$lte : 400}}
            //                  ]
            //             }
            //         ]
                
            //     }    
        );
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
                "location" : doc.location,
                "startTime": doc.startTime,
                "type": doc.type,
                "latLong": doc.latLong
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
// Starting the server
    app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Node app is running on host -- ' + process.env.IP + ':'+process.env.PORT);
    });

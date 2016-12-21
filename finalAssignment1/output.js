var http = require("http");
var fs = require("fs");

//mongo db address
    var url = 'mongodb://' + process.env.IP + ':27017/aameetings';
 
    var index1 = fs.readFileSync("index1.txt");
    var index3 = fs.readFileSync("index3.txt");
    
    var MongoClient = require('mongodb').MongoClient;

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
   


var server = http.createServer(function(req, res) {

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}
    
        var collection = db.collection('meetingtimes');
    
        collection.
        aggregate([ // start of aggregation pipeline
            // match by day and time
            { $match :
                
                { $or :
                    [
                        { $and : 
                            [
                                {day : currentDay},
                                {startTime : { $gte :  est24Hr  }},
                                {startTime: {$lte : 2400}}
                             ]
                        },
                        
                        { $and : 
                            [
                                {day : (days.indexOf(currentDay) + 1)>6 ? days[0] : days[days.indexOf(currentDay) + 1]},
                                {startTime: {$gte : 0}},
                                {startTime: {$lte : 400}}
                             ]
                        }
                    ]
                
                } 
            },
            
            { $group: 
                {
                    _id : { address : "$address"},
                    meetingGroups : { $push : 
                        {
                            groupInfo : "$_id",
                            title: "$title",
                            timings: "$timings",
                            day: "$day",
                            type: "$type",
                            interest: "$interest",
                            location: "$location",
                            startTime: "$startTime",
                            type: "$type",
                            latLong: "$latLong"
                        }
                    }
                }
                
            }
        
            ])
            .toArray(function(err, docs) { // end of aggregation pipeline
            if (err) {console.log(err)}
            
            else {
                res.writeHead(200, {'content-type': 'text/html'});
                res.write(index1);
                res.write(JSON.stringify(docs));
                res.end(index3);
            }
            db.close();
        });
    });
});


server.listen(process.env.PORT);



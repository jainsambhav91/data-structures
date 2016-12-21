var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var request = require('request');

var apiKey = 'AIzaSyA37YQg3rRdc5b_NGEBR1xvQdKzNWdOA5w';
console.log(apiKey);

var content, meetings = [];

// for loop that calls the read function for every .txt file
for(var j=1; j<=10; j++){
  if(j<10){
    read('0' + j);
  }else{
    read(j);
  }
}

function read(file){
    content = fs.readFileSync('m' + file + '.txt');
    scrape(content);
}

function scrape(cont){

var $ = cheerio.load(cont);



    $('tbody tr').each(function(i, elem) {
        
        var data = $(elem).find('td').eq(1).html().replace('\r\n                    \t\t\r\n\t\t\t\t\t', '').split('<br>\r\n                    \t<br>');
        
        for (var i = 0; i < data.length; i++) {
        // Ignore items which are blank (because the split function also ropes the whitespace that comes after the split into the array)
        if (data[i] !== '') {
            
            
            console.log(" ==================   data " +  i + " ====================================  ");
            console.log(data[i]);
            console.log(" ====================================  ");
            
            
            // Further cleaning up - remove new line, carriage return, tab characters, forward slashes, <br>s, and <b>s
            var text = data[i].replace(/[\r\n\t\/]/g, '').replace(/(<br>)/g, '').replace(/(<b>)/g, '');
            // Declare meeting object to hold meeting info
            var meeting = new Object;
            // Assign the info to the object
            meeting.address = cleanAddress($(elem).find('td').eq(0).html().split('\n')[3].split(',')[0].split('- ')[0].split('(')[0].trim());
           console.log(meeting.address);
            meeting.days = text.split('From')[0].trim();
            console.log(meeting.days);
            meeting.start = changeTimeFormat(text.split('From')[1].split('to')[0].trim());
            console.log(meeting.start);
            meeting.end = changeTimeFormat(text.split('From')[1].split('to')[1].split('Meeting Type')[0].trim());
            console.log(meeting.end);
            if(text.split('Meeting Type')[1] != undefined){ meeting.type = text.split('Meeting Type')[1].split('=')[0].trim(); }else{ meeting.type = ""};              
            console.log(meeting.type);
            // Assign special interest info - if special interest doesn't exist then set 'interest' to null 
            if (text.indexOf('Special Interest') !== -1)
                meeting.interest = text.split('Special Interest')[1].trim();
            else
                meeting.interest = null;
            // Push meeting object into meetings array
            meetings.push(meeting);
        }
    }
        
        
        
    });

//console.log(meetings.length);    

function cleanTitle(title){
            return title.split(' -')[0]
            .replace("(:II)","")
            .replace("(:I)","")
            .replace("(:1)","")
            .replace("(I)","")
            .replace("\\","")
            .trim();
            }

function cleanAddress(addr){
            return addr
            .replace('W.', 'West')
            .replace('E.', 'East')
            .concat(", New York, NY")
            .trim();
            }

function changeTimeFormat(time){
     var hours = time.split(':')[0];
    var minutes = time.split(':')[1].split(' ')[0];
    var period = time.split(' ')[1];
    if (period === 'PM' && hours <= 11) {
        hours = String(Number(hours) + 12);
    }
    return Number(hours + minutes);
}


}
console.log(meetings.length);
// console.log(meetings);

var ct=1;
// Cycle through the object (using async.echObject instead of async.eachSeries) and request for each meeting's latLong using GMAPS API
async.eachSeries(meetings, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.address.split(' ').join('+') + '&key=' + apiKey;
    request(apiRequest, function(err, resp, body) {
        if (err) { throw err; }
        //console.log(JSON.parse(body));
        // Assign latLong data to current meeting object
        value.latLong = JSON.parse(body).results[0].geometry.location;
        
        console.log("fetched - "+ct);
        ct++;
    });
    
    setTimeout(callback, 2500);
}, function() {
    console.log(meetings.length);
    // Write the meetings data to output.txt
    //fs.writeFileSync('arrayNew' + '.txt', JSON.stringify(meetings));
    
    var url = 'mongodb://' + process.env.IP + ':27017/aameetings';

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; // npm install mongodb
    
    MongoClient.connect(url, function(err, db) {
        if (err) {
            return console.dir(err);
        }
        var collection = db.collection('meetingtimes2');
        
        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
            collection.insert(meetings);
            db.close();
    });

});


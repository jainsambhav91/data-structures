
// required modules
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

var content;
var meetings = [];

var apiKey = process.env.GMAKEY;

// for loop that calls the read function for every .txt file
for(var j=1; j<=2; j++){
  if(j<10){
    read('0' + j);
  }else{
    read(j);
  }
}

// read function calls the scrape function 
function read(file){
    content = fs.readFileSync('m' + file + '.txt');
    scrape(content);
}


// scrape function loads the content and scrapes the data out into an array
function scrape(content){
    
    var $ = cheerio.load(content);

    $('div table tbody tr').each(function(i, elem) {
        
        var address = $(elem)
        .find('td')
        .first()
        .text()
        .split('\n')[3]
        .split(',')[0]
        .split('- ')[0]
        .split('(')[0]
        .split('@')[0]
        .trim();
        //console.log(address);
        
        
        // meeting location
        var location = $(elem)
        .find('td')
        .first()
        .find('h4')
        .text()
        .split('\n')[0]
        .trim();
        // console.log(location);
        
        // meeting title
        var title = $(elem)
        .find('td')
        .first()
        .find('b')
        .text()
        .trim();
        // console.log(title);
        
        var times = $(elem)
        .find("td:nth-child(2)")
        .html()
        .replace('\r\n                    \t\t\r\n\t\t\t\t\t', '')
        .replace(/[\r\n\t\/]/g, '')
        .replace(/(<br>)/g, '')
        .replace(/(<b>)/g, '')
        .trim()
        .split('                                               ');
        var meeting = new Object;
        //console.log(times);
        
        
        for(var j=0;j<times.length;j++){
            
            // meeting address from above:
            meeting.address = cleanAddress(address);
            
            // meeting location from above:
            meeting.location = location;
            
            // meeting title from above:
            meeting.title = cleanTitle(title);
            console.log(meeting.title);
            
            // meeting timings along with day and start time
            if(times[j].substring(0,times[j].indexOf("Meeting Type")).split("From")[1] != undefined){
                meeting.timings = times[j].substring(0,times[j].indexOf("Meeting Type")).split("From")[1].trim();
                // console.log(meeting.timings);
                meeting.day = times[j].substring(0,times[j].indexOf("Meeting Type")).split("From")[0].trim();
                // console.log(meeting.day);
                meeting.startTime = changeTimeFormat(times[j].substring(0,times[j].indexOf("Meeting Type")).split("From")[1].split("to")[0].trim().split(" "));
                // console.log(meeting.startTime);
                }
                
            // meeting type
            if(times[j].indexOf("Meeting Type") !== -1 ){
                meeting.type = times[j].substring(times[j].indexOf("Meeting Type") + 12,times[j].indexOf("meeting") + 7).trim();
                // console.log(meeting.type);
                }
            
            // special interest
            if(times[j].indexOf("Special Interest") !== -1 ){
                meeting.interest = times[j].split('Special Interest')[1].trim();
                // console.log(meeting.interest);
                }
            
            }
            meetings.push(meeting);
    }); 
}

fs.writeFileSync('array' + '.txt', JSON.stringify(meetings));

function changeTimeFormat(time){
    var hour = time[0].split(":")[0];
    var minute = time[0].split(":")[1];
    var period = time[1];
    if (period === 'PM' && hour <= 11){
        return  Number(String(Number(hour) + 12) + minute);
    } else {
        return Number(String(hour) + String(minute));
    }
}


function cleanTitle(title){
    return title.split(' -')[0]
    .replace("(:II)","")
    .replace("(:I)","")
    .replace("(:1)","")
    .replace("(I)","")
    .trim();
}

function cleanAddress(addr){
        return addr
        .replace('W.', 'West')
        .replace('E.', 'East')
        .concat(", New York, NY")
        .trim();
}

// Cycle through the object (using async.echObject instead of async.eachSeries) and request for each meeting's latLong using GMAPS API
async.eachSeries(meetings, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.address.split(' ').join('+') + '&key=' + apiKey;
    request(apiRequest, function(err, resp, body) {
        if (err) { throw err; }
        // Assign latLong data to current meeting object
        value.latLong = JSON.parse(body).results[0].geometry.location;
    });
    
    setTimeout(callback, 1000);
}, function() {
    console.log(meetings);
    // Write the meetings data to output.txt
    fs.writeFileSync('array' + '.txt', JSON.stringify(meetings));
});

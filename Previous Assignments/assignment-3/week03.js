//modules
var fs = require('fs'); // npm install fs
var request = require('request'); // npm install request
var async = require('async'); // npm install async


// ======================================================
// read all the addresses from text file into an array
// ======================================================

var address = fs.readFileSync('/home/ubuntu/workspace/assignment-3/address.txt').toString().split(",");



// =====================================================
// adjusting the address format for the Google Maps api
// =====================================================

for(var i = 0; i<address.length; i++)
{
    address[i] = address[i] + ", New York, NY";
    // adding another loop to replace the spaces with a '+'. (the replace() function replaces only one space at a time)
    // for(var j=0; j<10; j++){ 
    // address[i] = address[i].replace(" ", "+"); 
    //}
}



// ===================================================
// importing the api key into a variable
// ===================================================

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export GMAKEY="Content of Google Maps API"
// printenv | grep GMAKEY
var apiKey = process.env.GMAKEY;


// ===================================================================================================================
// exporting the address and lat long positions of each meeting location into an object and storing it in a text file.
// ===================================================================================================================

var meetingsData = [];

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(address, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey;
    var thisMeeting = new Object;
    thisMeeting.address = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        meetingsData.push(thisMeeting);
    });
    setTimeout(callback, 500);
}, function() {
    console.log(meetingsData);
    fs.writeFileSync('/home/ubuntu/workspace/assignment-3/lat-long.txt',JSON.stringify(meetingsData));
});
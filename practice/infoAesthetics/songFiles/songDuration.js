// required modules
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var content;

var duration = [];
var songNumber;

for(var i = 2; i <= 304; i++){
  var songFile = 'song'+i;
  read(songFile);
  songNumber = i;
}

// read function calls the scrape function 
function read(file){
    content = fs.readFileSync(file);
    scrape(content);
}


// scrape function loads the content and scrapes the data out into an array
function scrape(content){
    var counter = 0;
    var $ = cheerio.load(content);

    $('tr').each(function(i, elem) {
        if(counter === 0 && $(elem).find('th').text() === 'Length'){
                duration.push($(elem).find('td').text().split(" ")[0].replace("[1]","").replace("[2]","").replace("[3]","").replace("[4]","").replace("[5]",""));
                counter++;
        }
    });
    if(counter === 0){
        duration.push("not recorded");
    }
}

for(var i = 0; i < duration.length; i++){
    console.log(duration[i]);
}
// required modules
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var content;

var instruments = [];
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

    instruments.push($("#Personnel").parent().nextUntil("h2","ul").text());
    // console.log("--------------------");
    // $('span').each(function(i, elem) {
    //     if(counter === 0 && $(elem).text() === 'Personnel'){
    //             console.log($(elem).parent().text());
    //             //instruments.push($(elem).parent().next('ul').text());
    //             //instruments.push($(elem).find('td').text().split(" ")[0].replace("[1]","").replace("[2]","").replace("[3]","").replace("[4]","").replace("[5]",""));
    //             // counter++;
    //     }
    // });
    // if(counter === 0){
    //     instruments.push("not recorded");
    // }
}


fs.writeFileSync('/home/ubuntu/workspace/practice/infoAesthetics/songFiles/instruments.txt', instruments);
// for(var i = 0; i < instruments.length; i++){
//     console.log(instruments[i]);
// }


var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('/home/ubuntu/workspace/assignment-1/data/page-01.txt');
var $ = cheerio.load(content);


// trying to select all elements with width = 260px (not working)

// $('td').each(function(i, elem) {
//     if($(elem).css('width','260px')) {
//         console.log($(elem).text());
//     } 
// });


// trying to select all elements with exactly the same css style as the address fields (working)

$('td').each(function(i, elem) {
    if($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px") {
        console.log($(elem).text());
    } 
});


// removing the detailsBox class (not working)

// $('td').each(function(i, elem) {
//     if($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px") {
//         if($(elem).attr("class") !== "detailsBox"){
//         console.log($(elem).text());
//         }
//     } 
// });


// var meetings = [];
// $('tbody').find('tr').each(function(i, elem){
// meetings.push($(elem).find('td').eq(0).html().split('<br>')[2].trim());
//});
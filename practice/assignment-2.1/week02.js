// var fs = require('fs');
// var cheerio = require('cheerio');

// var content = fs.readFileSync('/home/ubuntu/workspace/assignment-1/data/page-01.txt');
// var $ = cheerio.load(content);


// trying to select all elements with width = 260px (not working)

// $('td').each(function(i, elem) {
//     if($(elem).css('width','260px')) {
//         console.log($(elem).text());
//     } 
// });


// trying to select all elements with exactly the same css style as the address fields (working)
/*
$('td').each(function(i, elem) {
    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px") {
        console.log($(elem).text());
    }
});
*/

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




// ************************************
// Joshua's Code:
// ************************************



var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('/home/ubuntu/workspace/practice/assignment-1.1/data/m01.txt');

var $ = cheerio.load(content);
var data = [];
var address = [];


// $('div table tbody tr') selects the <tr> based on this hierarchy
// .each() loops through each of the <tr>s
$('div table tbody tr').each(function(i, elem) {
    // looks for the first <td> (there are 3 <td>s within <tr>) and pushes its content into an array.
    data.push($(elem).find('td').first().text());
});

// loop to extract the addresses and store them into an array
for (var i = 0; i < data.length; i++) {
    address.push(data[i]
        // splits everything separated by a line break ('\n') into an array of substrings and selects item [3] where the address is placed 
        .split('\n')[3]
        // splits everything separated by a ',' into an array of substrings and selects item [0] which is the address
        .split(',')[0]
        // splits everything separated by a '- ' into an array of substrings (added a space because some addresses go like 206-208 East 11th Street)
        .split('- ')[0]
        // splits everything separated by a '(' into an array of substrings as ome addresses have additional info wraped in parentheses '()' 
        .split('(')[0]
        // removes all whitespace
        .trim()
        );
}

// show all addresses in console
for (var i = 0; i < address.length; i++) {
    console.log(address[i]);
}

    fs.writeFileSync('/home/ubuntu/workspace/assignment-3/address.txt',address);

/*

// ****************************************************
// Try - taking hints from Joshua's code
// ****************************************************


var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('/home/ubuntu/workspace/practice/assignment-1.1/data/m01.txt');

var $ = cheerio.load(content);
var data = [];
var address = [];


$('td').each(function(i, elem){
    if($(elem).attr("style")== 'border-bottom:1px solid #e3e3e3; width:260px'){
        console.log($(elem).text());        
    }
});


for(var i = 0; i < data.length; i++){
    address.push(data[i].trim());    
}

*/
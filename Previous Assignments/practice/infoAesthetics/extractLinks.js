var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('/home/ubuntu/workspace/practice/infoAesthetics/body.txt');

var $ = cheerio.load(content);

var songName = [];
var data = [];
var cleanData = [];
var cleanData2 = [];


$('tr').each(function(i, elem) {
    data.push($(elem).find('td').first().find('a').attr('href'));
    songName.push($(elem).find('td').first().find('a').text());
});

for(var i = 0; i < data.length; i++){
    if(data[i] === undefined){
    }else{
        cleanData.push([songName[i], ("en.wikipedia.org" + data[i])]);
        //cleanData.push
        //console.log(songName[i] + " : " + "en.wikipedia.org" + data[i]);
    }
}
// console.log(cleanData[10][0] + " : " + cleanData[10][1]);

fs.writeFileSync('/home/ubuntu/workspace/practice/infoAesthetics/links.txt',cleanData);

// .attr('href')

var request = require('request');



// // **** Request and save song list  web page****

for(var i = 2; i< cleanData.length - 9; i++){
    console.log(cleanData[i][0] + "|" + cleanData[i][1]);
    cleanData2.push([cleanData[i][1], cleanData[i][0]]);
    var song = "song" + i;
    requesting(cleanData[i][1], song);
}

// requesting();


function requesting(url, name) {
     request('https://' + url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ubuntu/workspace/practice/infoAesthetics/songFiles/' + name, body);
      }
      else {console.error('request failed')}
    });
}

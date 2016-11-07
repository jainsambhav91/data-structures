var request = require('request');
var fs = require('fs');

// **** Request and save song list  web page****
request('https://en.wikipedia.org/wiki/List_of_songs_recorded_by_the_Beatles', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/practice/infoAesthetics/body.txt', body);
  }
  else {console.error('request failed')}
});

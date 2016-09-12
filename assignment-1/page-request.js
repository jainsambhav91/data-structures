var request = require('request');
var fs = require('fs');

// **** Request and save link 1 ****
request('http://visualizedata.github.io/datastructures/data/m01.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/page-01.txt', body);
  }
  else {console.error('request failed')}
});


// **** Request and save link 2 ****
request('http://visualizedata.github.io/datastructures/data/m02.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/page-02.txt', body);
  }
  else {console.error('request failed')}
});


// **** Request and save link 3 ****
request('http://visualizedata.github.io/datastructures/data/m03.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/page-03.txt', body);
  }
  else {console.error('request failed')}
});


// **** Request and save link 4 ****
request('http://visualizedata.github.io/datastructures/data/m04.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/page-04.txt', body);
  }
  else {console.error('request failed')}
});


// **** Request and save link 5 ****
request('http://visualizedata.github.io/datastructures/data/m05.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/page-05.txt', body);
  }
  else {console.error('request failed')}
});


// **** Request and save link 6 ****
request('http://visualizedata.github.io/datastructures/data/m06.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/page-06.txt', body);
  }
  else {console.error('request failed')}
});


// **** Request and save link 7 ****
request('http://visualizedata.github.io/datastructures/data/m07.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/page-07.txt', body);
  }
  else {console.error('request failed')}
});


// **** Request and save link 8 ****
request('http://visualizedata.github.io/datastructures/data/m08.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/page-08.txt', body);
  }
  else {console.error('request failed')}
});


// **** Request and save link 9 ****
request('http://visualizedata.github.io/datastructures/data/m09.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/page-09.txt', body);
  }
  else {console.error('request failed')}
});


// **** Request and save link 10 ****
request('http://visualizedata.github.io/datastructures/data/m10.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/page-10.txt', body);
  }
  else {console.error('request failed')}
});


//  **** Trying For loop to request pages and load them into text files at once ****

/*
var lnks = ["http://visualizedata.github.io/datastructures/data/m01.html", "http://visualizedata.github.io/datastructures/data/m02.html", "http://visualizedata.github.io/datastructures/data/m03.html", "http://visualizedata.github.io/datastructures/data/m04.html", "http://visualizedata.github.io/datastructures/data/m05.html", "http://visualizedata.github.io/datastructures/data/m06.html", "http://visualizedata.github.io/datastructures/data/m07.html", "http://visualizedata.github.io/datastructures/data/m08.html", "http://visualizedata.github.io/datastructures/data/m09.html", "http://visualizedata.github.io/datastructures/data/m10.html"];

for(var i = 0; i <= 9; i++)
{
    var dest = "/home/ubuntu/workspace/data2/page-0" + i + ".txt";
request(lnks[i], function (error, response, body) 
{
  if (!error && response.statusCode == 200) {
    fs.writeFileSync(dest, body);
  }
  else {console.error('request failed')}
});

}

*/

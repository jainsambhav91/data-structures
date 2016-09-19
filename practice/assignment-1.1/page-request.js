var request = require('request');
var fs = require('fs');



/*

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




// Elena's method:

/*
var url = 'http://visualizedata.github.io/datastructures/data/m';

for(var i=1; i<=10; i++){
  if(i<10){
    requesting('0' + i);
  } else{
    requesting(i);
  }
}

function requesting(file){
  request(url + file + '.html', function(error, response, body){
    if( !error && response.statusCode == 200) {
      console.log('Read file ' + file + ' successfully');
      fs.writeFileSync('data/m' + file + '.txt', body);
      console.log('Write file ' + file + '...');
  } else {
    console.log('request failed.');
  }
});
}
*/



// Riley's Method:

function dataWriter(i) {
  
  if (i < 11) { 
    
    // set fileNum var to avoid error on single -> double digit
    var fileNum;
     if ( i < 10 ) {
       fileNum = '0' + i;
     } else {
       fileNum = i;
     }
       
    request('http://visualizedata.github.io/datastructures/data/m'+fileNum+'.html', function (error, response, body) {
     if (!error && response.statusCode == 200) {
       
       // write output
       console.log(fileNum+'.txt');
       fs.writeFileSync('data-2/'+fileNum+'.txt', body);
       
       //callback
       dataWriter(i+1)
     }
     else {console.error('request failed')}
    
    })
  }
}

dataWriter(1);


// When the request function is added in a for loop, by the time the request to the html is made, the for loop loops through to the last i value and the first html text gets written in the 10th text file
// therefore, request function needs to be added in another function, and that function must run in a loop so that the request function runs 10 times. 

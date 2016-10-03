var fs = require('fs');
var cheerio = require('cheerio');

// for (var i = 1; i <= 10; i++) {
//     for(var i=1; i<=10; i++){
//   if(i<10){
//     requesting('0' + i);
//   } else{
//     requesting(i);
//   }
// }


var content = fs.readFileSync('/home/ubuntu/workspace/practice/assignment-1.1/data/m01.txt');

var $ = cheerio.load(content);

var meetings = [];

// var address = [];
// var time = [];


// var data = { address: [], time: []};


// $('div table tbody tr') selects the <tr> based on this hierarchy
// .each() loops through each of the <tr>s
$('div table tbody tr').each(function(i, elem) {
    
    var address= $(elem).find('td').first().text().split('\n')[3].split(',')[0].split('- ')[0].split('(')[0].trim();

    var times = $(elem).find("td:nth-child(2)").html().replace('\r\n                    \t\t\r\n\t\t\t\t\t', '').replace(/[\r\n\t\/]/g, '').replace(/(<br>)/g, '').replace(/(<b>)/g, '').trim().split('                                               ');

    for(var j=0;j<times.length;j++){
        
        var meeting = { "address" : address, 
            //"time" : "24hrformat",
            "day" : times[j].substring(0,times[j].indexOf("Meeting Type")).split("From")[0].trim(),
            "timings" : times[j].substring(0,times[j].indexOf("Meeting Type")).split("From")[1].trim(),
            "startTime" : changeTimeFormat(times[j].substring(0,times[j].indexOf("Meeting Type")).split("From")[1].split("to")[0].trim().split(" "))
            
        };
        meetings.push(meeting);
    }
    
    // for(var j = 0; j < tempTime[i].length; j++){
    //     console.log(tempTime[j]);
    //     if(tempTime[j].indexOf(substr) !== -1){
    //         data.time.push(tempTime[j]);
    //     }
    // }
    
    //data.time.push(splitString(($(elem).find("td:nth-child(2)").text().split('\n')[2].trim())));
    //$(elem).find("td:nth-child(2)").text().split('\n')[2].trim());
    //data.push(address[i], time[i]);
});


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


// for (var i = 0; i < tempTime.length; i++){
//     for(var j = 0; j < tempTime[i].length; j++){
//         if(tempTime[i][j].indexOf(substr) !== -1){
//             data.time.push(tempTime[j]);
//         }
//     }
// }

// // loop to extract the addresses and store them into an array
// for (var i = 0; i < data.length; i++) {
//     address.push(data[i]
//         // splits everything separated by a line break ('\n') into an array of substrings and selects item [3] where the address is placed 
//         .split('\n')[3]
//         // splits everything separated by a ',' into an array of substrings and selects item [0] which is the address
//         .split(',')[0]
//         // splits everything separated by a '- ' into an array of substrings (added a space because some addresses go like 206-208 East 11th Street)
//         .split('- ')[0]
//         // splits everything separated by a '(' into an array of substrings as ome addresses have additional info wraped in parentheses '()' 
//         .split('(')[0]
//         // removes all whitespace
//         .trim()
//         );
// }



// $('div table tbody tr').each(function(i, elem) {
//     // looks for the first <td> (there are 3 <td>s within <tr>) and pushes its content into an array.
//     timeData.push($(elem).find("td:nth-child(2)").text());
// });




// console.log(data.address[0]);

// console.log(data.time[0]);



// // show all addresses in console
// for (var i = 0; i < address.length; i++) {
//     console.log(address[i]);
// }

//     fs.writeFileSync('/home/ubuntu/workspace/assignment-3/address.txt',address);


//console.log(meetings);



var url = 'mongodb://' + process.env.IP + ':27017/aameetings';

// Retrieve
var MongoClient = require('mongodb').MongoClient; // npm install mongodb

MongoClient.connect(url, function(err, db) {
    if (err) {
        return console.dir(err);
    }
    var collection = db.collection('meetingtimes');
    
    // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        collection.insert(meetings);
        db.close();
});
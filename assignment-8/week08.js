var pg = require('pg');
var fs = require('fs');

// connection string
var un = "agaase"; // aws db username
var pw = "abcd1234"; // aws db password
var db = 'postgres'; // aws db database name
var ep = 'bestgpsproject.c55t6l9g9dv3.us-west-2.rds.amazonaws.com'; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;

var dropTable = "DROP TABLE IF EXISTS trackWorkTime;"
var createTableQuery = "CREATE TABLE trackWorkTime (day text, month text, date bigint, year bigint, hour bigint, minute bigint, second bigint, duration decimal);"
var selectAllQuery = "SELECT * FROM trackWorkTime;"


var complexQuery = "SELECT * FROM trackWorkTime ORDER BY date, hour, minute, second asc;"

var getValues = function(){
    var output = fs.readFileSync('sensorOutput.txt').toString();
    var lines = output.split("\n");
    var data = [];
    for(var i=0;i<lines.length;i++){
     
     var day = lines[i].split(", ")[1].split(" ")[0];
     var month = lines[i].split(", ")[1].split(" ")[1];
     var date = lines[i].split(", ")[1].split(" ")[2];
     var year = lines[i].split(", ")[1].split(" ")[3];
     var hour = Number(lines[i].split(", ")[1].split(" ")[4].split(":")[0]);
     var minute = Number(lines[i].split(", ")[1].split(" ")[4].split(":")[1]);
     var second = Number(lines[i].split(", ")[1].split(" ")[4].split(":")[2]);
     
     var duration;
     
     if( i==0 ){
       duration = 0;
     }else{
       duration = ((hour*60*60 + minute*60 + second) - (Number(lines[i-1].split(", ")[1].split(" ")[4].split(":")[0])*60*60 + Number(lines[i-1].split(", ")[1].split(" ")[4].split(":")[1])*60 + Number(lines[i-1].split(", ")[1].split(" ")[4].split(":")[2])))/(3600);
     }
     
     var obj = {
       "day" : day,
       "month" : month,
       "date" : date,
       "year" : year,
       "hour" : hour,
       "minute" : minute,
       "second" : second,
       "duration" : duration
     };
     
      data.push(obj)
     }
    // console.log(data); 
    return data; 
  }
  
  // console.log(getValues());
 
 
var modifyInsertQuery = function(data){
    var insertIntoQuery = "INSERT INTO trackWorkTime VALUES"
    for(var i=0;i<data.length;i++){
        insertIntoQuery += "('"+data[i].day+"','"+data[i].month+"',"+data[i].date+","+data[i].year + "," + data[i].hour +","+data[i].minute +","+data[i].second +"," + data[i].duration + "),";
    }
    insertIntoQuery = insertIntoQuery.substring(0,insertIntoQuery.length-1) + ";";
    return insertIntoQuery;
}
 


var runQ = function(q,c){
    pg.connect(conString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }

        client.query(q, function(err, result) {
            //call `done()` to release the client back to the pool
            done();
            c(err,result);
        });
    })
}

/** Chain of queries **/
runQ(dropTable,function(e,r){
    runQ(createTableQuery,function(e,r){
        if (e) {
            return console.error('error running query 1', e);
        }else{
            var data = getValues();
            var q = modifyInsertQuery(data);
            console.log(q);
            runQ(q,function(e,r){
                if (e) {
                    return console.error('error running query 2', e);
                }else{
                    runQ(complexQuery,function(e,r){
                        var rows = r.rows;
                        for(var i=0;i<rows.length;i++){
                            console.log(rows[i]);
                        }
                    })    
                }
            })
        }
    });
});
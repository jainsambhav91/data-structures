var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  this.pinMode(9, five.Pin.INPUT);

  var sensor = new five.Sensor.Digital(9);
  sensor.on("change", function() {
  		console.log('magnet')
  }); 

});
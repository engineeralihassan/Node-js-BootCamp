const EventEmitter= require('events');
const http = require('http');

const nodeEventEmitter= new EventEmitter();

nodeEventEmitter.on('newEvent',()=>{
   console.log("New Event Is Happen In Node");  
});
nodeEventEmitter.on('newEvent',()=>{
    console.log("Hello Ali this si second emit for same event");  
 });
 nodeEventEmitter.emit('newEvent');
//////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another request 😀");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
// streams are like send data in piece by piece form mean we did not send the data in a single time we send the data in streams like in 
// short packagets as many as we Want,

// Example of this is the Netflix and youtube 
 
// There are 4 types of streams in node js 
// 1-READABLE streams = IN WHICH WE CAN READ DATA = pipe/read
// 2-WRITEABLE streams = in which we write data = write/end
// 3-DUPLEX streams = readable and writeable on the same time = websocket
// 4-TRANSFORM streams = 

// Example we have a large file and we want to send the data o this file ot the client we can do this in many ways let do this 

// No 1 we can read the file and send it to the user 
const fs = require('fs');
const server= require('http').createServer();

server.on('request',(req,res)=>{
    console.log('Request is comes on server');
//    fs.readFile('./test-file.txt',(err,data)=>{
//     if(err){
//         console.log("Error is occured");
//         return
//     }
//         // res.end(data);
//         // STREAMS WAY
        // const readStream= fs.createReadStream('./test-file.txt');
        // readStream.on('data',chunk=>{
        //     console.log("Next chucnk is ready to add in previouse data");
        //     res.write(chunk);
        // });
        // readStream.on('end',()=>{
        //     res.end();
        // })
        // readStream.on('error',err=>{
        //     console.log("error comes to me");
        //     res.statusCode=500;
        //     res.end('File not Found');

        // })
        // Solution of the problem in this way we used the pip 
        // Back pressure solutions
        const readableStreame= fs.createReadStream('./test-file.txt');
        readableStreame.pipe(res);

   });

server.listen(8000,'127.0.0.1',()=>{
    console.log("Lisning requests on this server");
})




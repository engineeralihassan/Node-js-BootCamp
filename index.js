 const fs= require('fs');
 let http= require('http');
 const url = require('url');
// let hello = "Hello world its an first node script";
// let modules = "Hello this is modules intro lecture";

// console.log(hello);
// console.log(modules);

// // Write and reading files in node Modules

// // REad File
// let textInFile= fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// console.log(textInFile);

// // Write files 

// let dataForFile=   `This is the new text we inserted in the file :  \nwe inserted on ${Date.now()}`;
// fs.writeFileSync('./starter/txt/input.txt',dataForFile);
// console.log('File writter successfully');

// Blocking and non blocking events in Node.js | Reading and writing files async way
// REad File Async way
// console.log("File reading start");
// let readFileAsync= fs.readFile('./starter/txt/input.txt', 'utf-8', (err,data)=>{
// console.log(data);
// });
// console.log("File reading End");
// console.log(textInFile);

// Write files Async

// let dataForFile=   `This is the new text we inserted in the file :  \nwe inserted on ${Date.now()}`;
// fs.writeFile('./starter/txt/input.txt',dataForFile,'utf-8',(error)=>{
//     console.log("File Has been written successfully");
// });


// ___________________________________ CREATING A WEB SERVER FROM SRATCH ____________________//

// const server=http.createServer((req,res)=>{
//     console.log(req.url);
//     let pathName=req.url;
//     if(pathName === '/' || pathName === '/overview'){
//         res.end("This the responce for the overview Page");
//     }
//     else if(pathName === '/product'){
//         res.end("This is the responce for the Product Page");
//     }
//     else{
//         res.writeHead(404,{
//            'content-type' : 'text/html',
//            'my-own-header':'example of custome headers',
//         })
//         res.end("Page Note found Please try with correct URL");
//     }
    
// });
// server.listen(8000,'127.0.0.1',()=>{
//     console.log("Server is lisning on the demand");
// });


// ___________________________________ START CREATING A SIMPLE API ____________________//
const server=http.createServer((req,res)=>{
    let pathName= req.url;
    if(pathName === '/' || pathName === '/overview'){
                res.end("This the responce for the overview Page");
            }
            else if(pathName === '/product'){
                fs.readFile(`./starter/dev-data/data.json`,'utf-8',(error,responce)=>{
                    if(error){
                        return res.end("Error occurs");
                    }
                    console.log(responce);
                    let data = JSON.parse(responce);
                    res.writeHead(200,{
                        'Content-type':'application/json',
                    })
                    res.end(responce);
                })
               
            }
            else{
                res.writeHead(404,{
                   'content-type' : 'text/html',
                   'my-own-header':'example of custome headers',
                })
                res.end("Page Note found Please try with correct URL");
            }


    
});
server.listen(8000,'127.0.0.1',()=>{
    console.log("Server is lisning on the demand");
});










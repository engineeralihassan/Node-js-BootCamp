 const fs= require('fs');
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

let dataForFile=   `This is the new text we inserted in the file :  \nwe inserted on ${Date.now()}`;
fs.writeFile('./starter/txt/input.txt',dataForFile,'utf-8',(error)=>{
    console.log("File Has been written successfully");
});









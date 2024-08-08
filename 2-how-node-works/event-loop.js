 const fs = require('fs');
 setTimeout(()=>{
    console.log("Timer 1 Finish")
 },0);
 setImmediate(()=>{
    console.log("Immidiate one ids finished");
 });

fs.readFile('./test-file.txt','utf-8',()=>{
    console.log("I/O finished");
});
console.log("The top level code is executed");
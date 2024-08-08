
// Hello and welcome to the Node js works behind the speechSynthesis;
// Node used V8 and LibUV
// V8-Engine = converts the js code into the machine code
// LivUv = I/O async operations 



// LibUV= ThreadPol | Event Pool
//   Event Pool                   |       Thread Pool
//  Used for the small tasks           Used for Heavy Tasks 


// _____________ PROCESSES | THREADS | THREAD POOL ____________________________ //

// PROCESS = The programe which is running and executing in the node 
// Thread = sequince of instructions=Single Thread 
// when app is initialized all the top level code is executed 
// Like all the codes except callbacks code all the requires code modules 
// at the end Event loop start

// Event Loop is the Heart of Node
// Some of the tasks are very heavy then thread pool comes in 
// by LibUv like file ststems Cryptography etc 

// __________ EVENT LOOP ____________
// dont use the  Sync versions of code in the casll backs
// dont perform very long calculations inside callbacks 
// dont perform any long and complex regular expressions 



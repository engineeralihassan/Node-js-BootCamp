const express= require('express');
const fs= require('fs');
const app=express();
const port =3000;
const tours= fs.readFileSync('./dev-data/data/tours-simple.json','utf8');
// app.get('/',(req,res)=>{
//     res.status(200).send("Hello from the server side in express");
// })
// // post Method in the API
// app.post('/',(req,res)=>{
//     res.status(200).send("Hello from the server in the post method");
// })

// Make some URLS according to the REST structure

app.get('/api/v1/tours',(req,res)=>{  
res.status(200).json({
 status:'success',
 results:tours.length,
 data:{

    tours
 }   
});
});





app.listen(port,()=>{
    console.log("Hello this is the app running on port");
});



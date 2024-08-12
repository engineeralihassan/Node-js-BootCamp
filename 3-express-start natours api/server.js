const mongoose = require('mongoose');
const app= require('./app');
const dotenv=require('dotenv');
dotenv.config({
    path:'./config.env'    
    });
const db=process.env.DATABASE;
mongoose.connect(db).then((connection=>{
    console.log(connection.connections);
    console.log("DB Connection is successfull");
}));

const tourSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A tour must have a name'],
        unique:true
    },
    rating:{
        type:Number,
      default:4.5
    },
    price:{
        type:Number,
        required:[true,'A tour must have a price'],
        
    },


})
const Tour= mongoose.model('Tour',tourSchema);


let testTour= new Tour({
    name:'This is the Test name',
    rating:3.4,
    price:4567
});

testTour.save().then((doc)=>{
    console.log(doc);
}).catch(error=>{
    console.log(error);
})






const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
const mongoose = require('mongoose');
const app= require('./app');
const dotenv=require('dotenv');
dotenv.config({
    path:'./config.env'    
    });
const db=process.env.DATABASE;
mongoose.connect(db).then((connection=>{
    console.log("DB Connection is successfull");
}));











const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
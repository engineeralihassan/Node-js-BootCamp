const app= require('./app');
const dotenv=require('dotenv');
dotenv.config({
    path:'./config.env'    
    });



console.log("current env",app.get('env') );
console.log(process.env);
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
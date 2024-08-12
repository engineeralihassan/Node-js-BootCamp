
const express = require('express');
const morgan= require('morgan');
const fs = require('fs');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

//  Middle-wares 
app.use(express.json());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use((req,res,next)=>{
    console.log("Hello from the Middle ware");
    req.isFromMiddleware=true;
    next();
});

app.use(express.static(`${__dirname}/public`))






  app.use('/api/v1/tours',tourRouter);
  app.use('/api/v1/users',userRouter);





module.exports=app;


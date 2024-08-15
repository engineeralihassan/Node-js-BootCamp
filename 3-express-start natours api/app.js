
const express = require('express');
const morgan= require('morgan');
const fs = require('fs');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError =require("./utils/appError");
const  globalErrorHandler= require("./controllers/errorController")
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

// UnMatched Route 
// Catch-all route handler for undefined routes
app.all('*', (req, res, next) => {
  // const err = new Error(`The Endpoint ${req.originalUrl} is not defined`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`The Endpoint ${req.originalUrl} is not defined`,404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports=app;


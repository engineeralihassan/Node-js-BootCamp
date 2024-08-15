const { stack } = require("../app");

const sendErrorDev=(err,res)=>{
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack:err.stack,
        error:err
      });
}
const sendErrorProd=(err,res)=>{
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
          });
    }else{
        res.status(err.statusCode).json({
            status: 'fail',
            message: 'Something went very wrong',
          }); 
    }
 
}


module.exports=(err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    // res.status(err.statusCode).json({
    //   status: err.status,
    //   message: err.message
    // });

    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(err,res);
    }
    else{
        sendErrorProd(err,res)
    }
  }
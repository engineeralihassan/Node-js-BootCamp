const User= require('../modals/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');


let createToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRATE,{
        expiresIn:process.env.EXPIRES_IN
});

}

exports.signUp= catchAsync(  async(req,res,next)=>{
    let user = await User.create(req.body);
    let token= createToken(user._id);
    
    res.status(200).json({
        status:'success',
        token,
        data:{
            user
        }
    })
});

exports.login= catchAsync(  async(req,res,next)=>{
    let {email,passsword}= req.body;
    if(!email || !passsword){
        return next(new AppError(`Please provide the email and password`,400));
    }
 const user = await User.findOne({ email }).select('+passsword');
console.log("user is",user);
 if (!user || !(await user.correctPassword(passsword, user.passsword))) {
    return next(new AppError('Incorrect email or password', 401));
  }
    else{
      let token=  createToken(user._id);
          res.status(200).json({
        status:'success',
        data:{
            token
        }
    })
    }

});
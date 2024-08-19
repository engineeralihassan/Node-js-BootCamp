const User= require('../modals/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');


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

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRATE);
  
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
  
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please log in again.', 401)
      );
    }
  
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  });

  // check Permissions

  exports.restrictTo=(...roles)=>{
    return (req,res,next)=>{
      if(!roles.includes(req.user.role)){
        return next(new AppError("User have no permissions to delete route",403));
      }
      next();
    }
  }

  exports.forgetPassword=catchAsync(async (req, res, next) => {
    
  });
  exports.resetPassword=catchAsync(async (req, res, next) => {});

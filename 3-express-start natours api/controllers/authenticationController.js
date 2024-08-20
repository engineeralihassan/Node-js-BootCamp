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

exports.protect= catchAsync(async(req,res,next)=>{
 let token;
    console.log("req.headers",req.headers);
    if(req.headers.authorization && req.headers.authorization.srartsWith('Bearer')){
         token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(new AppError('UnAuthorized user please login first',401))
    }

    let decoded= promisify(jwt.verify)(token,process.env.JWT_SECRATE);
    console.log("Decoded Token is : ",decoded);

    let freshUser= await User.findById(decoded.id);

    if(!freshUser){
        return next(new AppError('Login Token is not belongs to this user',401));
    }

   if(freshUser.passwordChangeAfter(decoded.iat)){
    return next(new AppError('User recently chnaged password please login again',401))
   }
req.user=freshUser;
// give access to the Route 
next();


});


exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
  
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
  
    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
  
    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    createSendToken(user, 200, res);
  });
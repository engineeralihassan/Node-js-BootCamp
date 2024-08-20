const mongoose= require('mongoose');
const validator=require('validator');
const { validate } = require('./tourModal');
const crypto = require('crypto');
const bcrypt= require('bcrypt');
const userScehma=mongoose.Schema({
name:{
    type:String,
    unique:true,
    trim:true,
    required:[true,'Name is a required'],
    maxlength:[50,'Name is a required'],
    minlength:[3,'Minimum threee is required'],


},
email:{
    trim:true,
    type:String,
    validate:[validator.isEmail,'Email should be an valid email'],
    unique:true,
    require:[true,"Email is an required feild"]
},
photo:String,
passsword:{
    type:String,
    maxlength:8,
    minlength:5,
    trim:true,
    required:[true,'Password must be requored feild'],
    select:false
},
role:{
    type:String,
    enum:['leade-guide','guide','admin','user']

},
confirmPasssword:{
    type:String,
    maxlength:8,
    minlength:5,
    trim:true,
    required:[true,'Confirm password must be requored feild'],
    validate:{
        validator:function(el){
              return el=== this.passsword;
        }
    }
},
passwordChangedAt:Date,
passwordResetToken: String,
passwordResetExpires: Date,


});

userScehma.pre('save', async function(next){
   
    if(!this.isModified('passsword')){
        console.log("Heelo we are in the save middle ware for user");
        return next();
    }else{
        console.log("Heelo we adfgddfre in the save middle ware for user");
        this.passsword= await bcrypt.hash(this.passsword,12);
        this.confirmPasssword=undefined;
        console.log(this.passsword);
    }

  

})

userScehma.methods.correctPassword=  async function(candidatePass,userPass){
    console.log("passUser",userPass,"pass",candidatePass);
    return await bcrypt.compare(candidatePass,userPass);
}

userScehma.methods.changedPasswordAfter=  function (jwtTimeStamp) {
    if(this.passwordChangedAt){
     const changedTimeStamp= parseInt(this.passwordChangedAt.getTime()/1000,10);
     console.log(changedTimeStamp,jwtTimeStamp);
     return jwtTimeStamp<changedTimeStamp;
    }

    return false;
}

// password reset token

userScehma.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };

const User= mongoose.model('User',userScehma);
module.exports=User;
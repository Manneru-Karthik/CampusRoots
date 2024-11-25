const mongoose=require('mongoose');
const bcrypt=require("bcryptjs")
const jwt= require("jsonwebtoken")
const crypto=require("crypto");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:[true,'Please enter a password.']
    }
});

userSchema.pre("save",async function(){
    const user = this;
    try{
     const saltRound=await bcrypt.genSalt(10);
     const hashpassword= await bcrypt.hash(user.password, saltRound);
     user.password=hashpassword;
     console.log("Got saved");
    }catch(error){
        console.error("Falied");
    }
});

userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken= async function(role){
    try{
    return jwt.sign({
      id:this._id.toString(),
      role
    },
    process.env.JWT_SECRET_KEY,
    {expiresIn:"1h",}
);
}catch(error){
    console.error(error);
}
}

userSchema.methods.createResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken= crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpires= Date.now()+10*60*1000;
    return resetToken;
}

userSchema.methods.isPasswordChanged= async function(JWTTimestamp){
    if(this.passwordChangedAt){
        const pswdChangedTimestamp=parseInt(this.passwordChangedAt.getTime()/1000,10);
        console.log(pswdChangedTimestamp, JWTTimestamp);

        return JWTTimestamp<pswdChangedTimestamp;
    }
    return false;
}

const usermodel=mongoose.model("adminmodels",userSchema);

module.exports=usermodel;
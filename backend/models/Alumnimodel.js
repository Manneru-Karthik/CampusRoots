const mongoose=require('mongoose');
const bcrypt=require("bcryptjs")
const jwt= require("jsonwebtoken")
const crypto=require("crypto");
const batch=require('./Batchmodel');
const userSchema= new mongoose.Schema({
    gmail:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
    },
    batch:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'batch'
    },
    password:{
        type:String,
        required:[true, 'Please enter a password.'],
        minlength:8
    },
    expertise: {
      type:String,
      required:true,
    },
    currentRole:  {
      type:String,
      required:true,
    },
    achievements:  {
      type:String,
      required:true,
    },

    passwordChangedAt:Date,
    passwordResetToken: String,
    passwordResetTokenExpires:Date,
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

userSchema.methods.findByGmail= async function(gmail){
    return await this.findOne({gmail});
};

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

const usermodel=mongoose.model("alumnimodel",userSchema);

module.exports=usermodel;
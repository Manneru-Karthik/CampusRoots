const Alumni= require('../models/Alumnimodel');
const Student= require('../models/Studentmodel');
const jwt= require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {sendmail} = require('./mailcontroller');
const crypto=require('crypto');
const bcrypt=require('bcryptjs');

const signToken = (id,role) => {
  return jwt.sign({id,role}, process.env.JWT_SECRET_KEY,{
    expiresIn:100000000
  })
}



const forgotPassword= async(req,res) => {
    const {gmail,role}=req.body;
    let user;

     if(role==="alumni"){
     user= await Alumni.findOne({gmail:gmail});
     }else{
      user= await Student.findOne({gmail:gmail});
     }

    
        if(!user){
            return res.send({msg:"User not found with gmail"});
        }
        const resetToken = user.createResetPasswordToken();

        await user.save();
        const username= user.username;
        const resetUrl=`https://campusroots.onrender.com/alumnitracking/resetPassword/${role}/${resetToken}`;
          let subject="Reset your password";
          let text=`Dear ${username} click on the below link to reset your password \n\n ${resetUrl}`;
          try{
         await sendmail(gmail,subject,text);
         console.log(resetUrl);
         res.status(200).json({msg:"Reset password sent"});
          }catch(err){
            user.passwordResetToken=undefined;
            user.passwordResetTokenExpires=undefined;
            user.save();
          }
};

const resetPassword = async(req,res) => {
  try{
     const token= crypto.createHash('sha256').update(req.params.token).digest('hex');
     let user;
     if(req.params.role==="admin"){
     user = await Alumni.findOne({passwordResetToken: token,passwordResetTokenExpires:{$gt:Date.now()}});
     }else{
      user = await Student.findOne({passwordResetToken: token,passwordResetTokenExpires:{$gt:Date.now()}});
     }
    
    if(!user){
      return res.status(400).send({msg:"Token expired"});
    }
    const password=req.body.password;
    const confirmPassword= req.body.confirmPassword;
    if(password!==confirmPassword){
      return res.status(400).json({msg:"Password doesnot match"});
    }
    const saltRound=await bcrypt.genSalt(10);
     const hashpassword= await bcrypt.hash(password, saltRound);
     user.password=hashpassword;
     user.passwordChangedAt=Date.now();
     user.passwordResetToken=undefined;
     user.passwordResetTokenExpires=undefined;
     
     await user.save();

     const loginToken = signToken(user._id,req.params.role);

     return res.status(200).json({
      token:loginToken,
     msg: "Password changed successfully"});
  }
  catch(err){
    return res.status(400).json({msg:"Error occured in reset token"});
  }
}

const updatePassword = async(req,res,next) =>{
  let user;
  if(req.body.role==="alumni"){
    user= await Alumni.findById(req.user._id);
  }else{
    user= await Student.findById(req.user.id);
  }

   if(!(await user.comparePassword(req.body.currentPassword, user.password))){
    return res.status(400).json({msg:"Current Password is not matched"});
   }
   let password=req.body.password;
   let confirmPassword= req.body.confirmPassword;
   if(password!==confirmPassword){
    return res.status(400).json({msg:"Password and confirmPassword is not matched"});
   }

   user.password=password;
   user.passwordChangedAt=Date.now();
   await user.save();

  const token= signToken(user._id,req.body.role);

  res.status(201).json({token: token,
    msg:"Update password token"
  });
}

module.exports={forgotPassword,resetPassword,updatePassword};
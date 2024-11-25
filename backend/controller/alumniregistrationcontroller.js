const usermodel= require('../models/Alumnimodel.js');
const {sendmail} = require('./mailcontroller.js');
const crypto=require('crypto');
const Batchmodel = require('../models/Batchmodel');
const jwt=require('jsonwebtoken');


const registerbatch = async (year) => {
    try{
     await Batchmodel.create({
            year
        });
        console.log("Batch registered");
       
    }catch(err){
        console.log(err);
    }
}



const alumniregistration = async (req, res,next) => {
    try {
        const { username,year,gmail, password,confirmPassword,expertise,currentRole,achievements } = req.body;
        // Find the batch by year
        if (password !== confirmPassword) {
            return res.status(400).send({ msg: "Password and Confirm Password do not match" });
        }
        let batchid = await Batchmodel.findOne({year:year});
        console.log(batchid);
        if (!batchid) {
           await registerbatch(year);
           batchid = await Batchmodel.findOne({year:year});
        }
        console.log(req.body);
        
        // Check if user already exists
        const existingUser = await usermodel.findOne({ gmail:gmail });
        if (existingUser) {
            console.error({ msg: "User exists with email" });
            return res.status(400).send({ msg: "User exists" });
        }
        const batch=batchid._id;
        
         const verificationToken = crypto.randomBytes(20).toString('hex');
        const verificationTokenExpires = Date.now() + 5 * 60 * 1000;


       let tempUser= {
            username,
            batch,
            gmail,
            password,
            expertise,currentRole,achievements,
            verificationToken,
            verificationTokenExpires

        };
        const encodedToken = jwt.sign(tempUser, "JWT_SECRET", { expiresIn: '5m' });

        const verificationLink = `https://campusroots-frontend.onrender.com/verify-email?token=${encodedToken}`;
        const subject = "Email verification";
        const text = `Dear ${username}, please verify your email by clicking on the following link: ${verificationLink}. The link will expire in 5 minutes.`;


        console.log(encodedToken);
        
       await sendmail(gmail,subject,text);
       return res.status(200).send({ msg: "Verification link sent. Please verify your email."});
        // Create new user
  
    } catch (error) {
        console.error(error);
        return res.status(500).send({ msg: "Internal Server Error" });
    }
}

const verifyEmail= async(req,res) => {
    try {
        const { token } = req.query;

        let tempUser;
        try {
          tempUser = jwt.verify(token, "JWT_SECRET");
        } catch (error) {
          return res.status(400).json({ msg: "Invalid or expired token. Please register again." });
        }
        console.log(tempUser);
        const usercreated =await usermodel.create({
            gmail:tempUser.gmail,
           username:tempUser.username,
            batch:tempUser.batch,
            password:tempUser.password,
            expertise:tempUser.expertise,
            currentRole:tempUser.currentRole
            ,achievements:tempUser.achievements,
        });
        


        const subject = "Successfully registered";
        const text = `Dear ${usercreated.username}, you are successfully registered as Alumni with Alumni Planet.`;

        await sendmail(usercreated.gmail, subject, text);
    
        console.log("Alumni registered successfully");
         res.status(200).send({ msg: "Email verified and registration completed successfully" });
    }
  catch (error) {
        console.error(error);
       return res.status(500).send({ msg: "Internal Server Error" });
    }
}

const getUsersByBatchYear = async (req, res) => {
    try {
        const { year } = req.body;

        // Find the batch by year
        const batch = await Batchmodel.findOne({ year });
        if (!batch) {
            return res.status(404).send({ msg: "Batch not found" });
        }

        // Find users by batch ID
        const users = await usermodel.find({ batch: batch._id }).lean();

        res.status(200).send({ users });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
}



module.exports={alumniregistration,verifyEmail};
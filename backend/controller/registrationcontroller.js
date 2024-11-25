const user=require('../models/Studentmodel.js');
const {sendmail} = require('./mailcontroller.js');
const crypto=require('crypto');
const Batchmodel = require('../models/Batchmodel');
const jwt= require('jsonwebtoken');

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

const generateVerificationCode = () => {
    return crypto.randomBytes(3).toString('hex'); // Generate a 6-character hex code
};

const studentregistration = async (req, res,next) => {
    try {
       
        const { username, usn,currentYear,gmail, password,confirmPassword } = req.body;
        // Find the batch by year
        if (password !== confirmPassword) {
            return res.status(400).send({ msg: "Password and Confirm Password do not match" });
        }
        let year=currentYear;
        let batchid = await Batchmodel.findOne({year:year});
        console.log(batchid);
        if (!batchid) {
           await registerbatch(currentYear);
           batchid = await Batchmodel.findOne({year:year});
        }
        
        // Check if user already exists
        const existingUser = await user.findOne({ usn: usn,gmail:gmail });
        if (existingUser) {
            console.error({ msg: "User exists with usn or email" });
            return res.status(400).send({ msg: "User exists" });
        }
        const batch=batchid._id;

        const verificationToken = crypto.randomBytes(20).toString('hex');
        const verificationTokenExpires = Date.now() + 5 * 60 * 1000;

        let tempUser= {
            username,
            batch,
            usn,
            gmail,
            password,
            verificationToken,
            verificationTokenExpires
        };
        
        const encodedToken = jwt.sign(tempUser, "JWT_SECRET", { expiresIn: '5m' });
       
        const verificationLink = `https://campusroots-frontend.onrender.com/verifystudentemail?token=${encodedToken}`;
        
        const subject="Email verification";
        const text = `Dear ${username}, please verify your email by clicking on the following link: ${verificationLink}. The link will expire in 5 minutes.`;

       await sendmail(gmail,subject,text);
       return res.status(200).send({ msg: "Verification code sent. Please verify your email."});
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

        const usercreated = await user.create({
           username:tempUser.username,
            batch:tempUser.batch,
            usn:tempUser.usn,
            gmail:tempUser.gmail,
            password:tempUser.password,
        });
        let subject="Successfully registered";
        let text=`Dear ${tempUser.username}, u are successfully registered as student with alumni website`
       await sendmail(tempUser.gmail,subject,text);
        
         console.log("Student registered");
        return res.status(200).send({ msg: "Email verified and registration completed successfully" });
        
    } catch (error) {
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



module.exports={studentregistration,verifyEmail};
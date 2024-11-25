const usermodel= require('../models/Adminmodel.js');



const adminregistration = async (req, res,next) => {
    try {
        const { username, password} = req.body;
  
        let tempUser= {
            username,
           
            password
        };
       
        const usercreated =await usermodel.create({
         
           username:tempUser.username,
           
            password:tempUser.password
        });
     

         
       
       return res.status(201).send({ msg: "Registered successfully"});
        // Create new user
  
    } catch (error) {
        console.error(error);
        return res.status(500).send({ msg: "Internal Server Error" });
    }
}




module.exports={adminregistration};
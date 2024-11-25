const nodemailer=require('nodemailer');

const sendmail=async(gmail,subject,text)=> {
    var transport = nodemailer.createTransport({
        service:'gmail',
        port: 465,
        auth: {
          user: process.env.email,
          pass: process.env.pass
        }
      });
    
      const mailOptions={
        from:process.env.email,
        to:`${gmail}`,
        subject:`${subject}`,
        text:`${text}`
      };
    
      transport.sendMail(mailOptions,function(error,info){
        if(error){
            console.log('Error:',error);
        }else{
            console.log('Email sent');
        }
      });
    
}

module.exports= {sendmail};
require("dotenv").config();
const User = require("../../Models/Users");
const account_sid = process.env.TWILIO_ACCOUNT_SID;
const auth_token = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(account_sid, auth_token);
const jwt=require('jsonwebtoken');

module.exports = {
  signup: async (req, res) => {
    try {
      console.log("-------------------------------------");
      console.log(req.body);
      console.log("-------------------------------------");
      const { username, email, mobileNumber, password } = req.body;
      console.log("mele");

      await client.verify.v2
        .services(process.env.TWILIO_SERVICE_SID)
        .verifications.create({ to: `+91 ${mobileNumber}`, channel: `sms` })
        .then((ress) => {
          console.log("--------------------res--------------");
          console.log(ress);
          console.log("--------------------res--------------");
          res.json({success:true, message: "OTP send successfully",data: req.body });
        })
        .catch((err) => {
          console.log("--------------------err--------------");
          console.log(err);
          console.log("--------------------err--------------");
         res.json('fals');
        });

      // const newUser=new User({
      //     username,
      //     email,
      //     mobileNumber,
      //     password
      // })
      // await newUser.save()

      
    } catch (error) {
      res.status(500).json({ error: "failed to send OTP" });
    }
  },
  verifyotp: async (req, res) => {
    try {
      console.log(req.body);
      const {
        mobileNumber,
        email,  
        username,
        password,
        iotp
      }=req.body

      client.verify.v2
        .services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks.create({ to: `+91${mobileNumber}`, code: `${iotp}` })
        .then(async (verificationCheck) => {
          console.log(verificationCheck.status)
          const newUser=new User({
          username,
          email,
          mobileNumber,
          password
          })
          await newUser.save()
          const secret=process.env.SECRET_KEY
          const payload={
            username,
            email,
            mobileNumber
          }
          let token =jwt.sign(payload,secret,{expiresIn:'1hr'})
          console.log(token);
          res.json({success:true ,message:'successfully register',token : token});

        });
    } catch (error) {
      console.error(error);
    }
  },
};

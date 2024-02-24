require('dotenv').config();
const User = require('../../Models/Users');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  signup: async (req, res) => {
    try {
      console.log(req.body);
      console.log('-------------------------------------');
      const {mobileNumber} = req.body;
      console.log('mele');

      await client.verify.v2
          .services(process.env.TWILIO_SERVICE_SID)
          .verifications.create({to: `+91 ${mobileNumber}`, channel: `sms`})
          .then((ress) => {
            console.log('--------------------res--------------');
            console.log(ress);
            console.log('--------------------res--------------');
            res.json({
              success: true,
              message: 'OTP send successfully',
              data: req.body,
            });
          })
          .catch((err) => {
            console.log('--------------------err--------------');
            console.log(err);
            console.log('--------------------err--------------');
            res.json('false');
          });
    } catch (error) {
      res.status(500).json({error: 'failed to send OTP'});
    }
  },
  verifyotp: async (req, res) => {
    try {
      console.log(req.body);
      const {mobileNumber, email, username, password, role, iotp} = req.body;
      const codedPassword = await bcrypt.hash(password, 8);

      client.verify.v2
          .services(process.env.TWILIO_SERVICE_SID)
          .verificationChecks.create({
            to: `+91${mobileNumber}`,
            code: `${iotp}`,
          })
          .then(async (verificationCheck) => {
            console.log(verificationCheck.status);
            const newUser = new User({
              username,
              email,
              mobileNumber,
              password: codedPassword,
              role,
            });
            await newUser.save();
            const secret = process.env.SECRET_KEY;
            const payload = {
              username,
              email,
              mobileNumber,
            };
            const token = jwt.sign(payload, secret, {expiresIn: '1hr'});
            console.log(token);
            res.json({
              success: true,
              message: 'successfully register',
              token: token,
            });
          });
    } catch (error) {
      console.error(error);
    }
  },
  login: async (req, res) => {
    try {
      console.log(req.body);
      const {username, password} = req.body;
      const existingUser = await User.findOne({username});
      if (!existingUser) {
        return res.status(400).send('Invalid Credentials');
      }
      const validPassord = await bcrypt.compare(
          password,
          existingUser.password,
      );
      if (!validPassord) {
        return res.status(400).send('Invalid Password');
      }
      const token = jwt.sign({id: existingUser._id}, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });
      res.json({token, message: 'login successfully', success: true});
    } catch (err) {
      console.log(error);
    }
  },
};

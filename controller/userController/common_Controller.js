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
      const {mobileNumber} = req.body;

      await client.verify.v2
          .services(process.env.TWILIO_SERVICE_SID)
          .verifications.create({to: `+91 ${mobileNumber}`, channel: `sms`})
          .then((ress) => {
            res.json({
              success: true,
              message: 'OTP send successfully',
              data: req.body,
            });
          })
          .catch((err) => {
            res.json('false');
          });
    } catch (error) {
      res.status(500).json({error: 'failed to send OTP'});
    }
  },
  verifyotp: async (req, res) => {
    try {
      const {mobileNumber, email, username, password, role, iotp} = req.body;
      const codedPassword = await bcrypt.hash(password, 8);

      client.verify.v2
          .services(process.env.TWILIO_SERVICE_SID)
          .verificationChecks.create({
            to: `+91${mobileNumber}`,
            code: `${iotp}`,
          })
          .then(async (verificationCheck) => {
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
              id: newUser._id,
              username,
              email,
              mobileNumber,
            };
            const token = jwt.sign(payload, secret, {expiresIn: '1d'});
            res.json({
              success: true,
              message: 'successfully register',
              token: token,
              role,
            });
          });
    } catch (error) {
      console.error(error);
    }
  },
  login: async (req, res) => {
    try {
      const {usernameOrEmail, password} = req.body;
      const existingUser = await User.findOne({username: usernameOrEmail});
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
      const payload = {
        id: existingUser._id,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '1d',
      });
      res.json({
        token,
        message: 'login successfully',
        success: true,
        existingUser,
        role: existingUser.role,
      });
    } catch (err) {
      console.log(error);
    }
  },
};

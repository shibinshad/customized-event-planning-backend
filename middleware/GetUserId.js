const jwt = require('jsonwebtoken');
const decodeUserId = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.tockens = decodedToken;
    next();
  } catch (err) {
    console.log('getUserID middleware', err);
    return res.status(500).json({message: 'Internal Server Error'});
  }
};
module.exports = decodeUserId;

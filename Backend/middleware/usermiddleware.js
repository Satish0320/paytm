require("dotenv").config();
const jwt = require("jsonwebtoken");

function UserMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  const decode = jwt.verify(authorization, process.env.JWT_SECRET);

  if (decode) {
    req.userId = decode.id;
    next();
  }
}

module.exports = {
  UserMiddleware,
};

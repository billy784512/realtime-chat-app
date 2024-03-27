import pkg from "jsonwebtoken";
import dotenv from "dotenv";

const {sign, verify} = pkg;
dotenv.config();

function authJWT(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorization' });
  }
  verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log("fail");
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = payload;
    next();
  });
}

export default authJWT


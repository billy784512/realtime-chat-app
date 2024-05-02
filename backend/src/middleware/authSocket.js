import pkg from "jsonwebtoken";
import dotenv from "dotenv";

const {verify} = pkg;
dotenv.config();

function authJWT(socket, next) {
  const token = socket.handshake.query.token;

  if (!token) {
    return next(new Error('Token is empty'));
  }

  verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return next(new Error('Auth fail'));
    }
    socket.user = payload;
    next();
  });
}

export default authJWT;


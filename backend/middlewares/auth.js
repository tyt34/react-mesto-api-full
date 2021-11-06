const jwt = require('jsonwebtoken');
const NeedAuth = require('../errors/need-auth');
require('dotenv').config();

let soup = 'dev-secret';

if (process.env.NODE_ENV === 'production') {
  soup = process.env.JWT_SECRET;
} else {
  soup = 'dev-secret';
}

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NeedAuth());
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, soup);
    } catch (e) {
      next(new NeedAuth());
    }
    req.user = payload; // { _id: '6175a4270f38a2b78ee1051c', iat: 1635099808, exp: 1635704608 }
    next();
  }
};

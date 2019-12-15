'use strict';

const fs   = require('fs');
const jwt = require('jsonwebtoken');

const publicKEY  = fs.readFileSync(process.env.PUBLIC_KEY, 'utf8');

const issuer  = process.env.ISSUER;
const subject  = process.env.SUBJECT;
const audience  = process.env.AUDIENCE;
const expiresIn = process.env.EXPIRESIN;

const verifyOptions = {
  issuer,
  subject,
  audience,
  expiresIn,
  algorithm: ['RS256']
 };

const verifyJWT = (token) => {
  try {
    const verification = jwt.verify(token, publicKEY, verifyOptions);
    return verification;
  } catch (e) {
    return false;
  }
};

module.exports = {
  verifyJWT
};
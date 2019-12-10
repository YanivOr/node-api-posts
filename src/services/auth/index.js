import { verifyJWT } from './jwt-handler'

const verifyAuth = (req, res, next) => {  
  // Express headers are auto converted to lowercase
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if(verifyJWT(token)) {
    next()
  } else {
    res.json({
      status: 'error'
    });
  }
}

export {
  verifyAuth
};
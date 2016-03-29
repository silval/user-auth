var jwt = require('jwt-simple');
var authorizeUser = require('./auth').authorizeUser;

module.exports = function(req, res, next) {

  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe.

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  if (token || key) {
    try {
      var decoded = jwt.decode(token, require('./secret.js')());

      if (decoded.exp <= Date.now()) {
        return returnFunction(res, 400, "TOKEN_EXPIRED");
      }
      if (decoded.username != key) {
        // Token username does not match username in request, respond back with a 401
        return returnFunction(res, 401, "INVALID_CREDENTIALS");
      }

      // Authorize the user to see if s/he can access our resources
      var dbUser = authorizeUser(key, req.url); // The key would be the logged in user's username

      if (dbUser && dbUser != null) {
        next(); // To move to next middleware
      } else {
        return returnFunction(res, 403, "NOT_AUTHORIZED");
      }

    } catch (err) {
      return returnFunction(res, 500, "TOKEN_DECODING_ERROR");
    }
  } else {
    return returnFunction(res, 401, "INVALID_TOKEN_OR_KEY");
  }
};
// private methods
function returnFunction(res, statusCode, message) {
  var retObj= {
    "status": statusCode,
    "message": message
  };
  res.status(statusCode);
  res.json(retObj);
  return JSON.stringify(retObj);
}

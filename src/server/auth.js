var jwt = require('jwt-simple');
var users_crud = require('./Users');
// mongoskin = require('mongoskin');

// this function requires "req.collections.users to be in the request object

function Auth() {
}
  // curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://127.0.0.1:8085/login

  // curl -H "Content-Type: application/json" -X GET -d '{"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NTk3NTA2OTg4MDV9.5J2KlDURlFrFWzS0Cjokyk5JtGI1e5f7z6Iv90jgAOE","x_key":"arvind@myapp.com"}' http://127.0.0.1:8085/api/v1/listAnchorTypes

Auth.prototype.login = function(req, res) {
    var username = req.body.username || '';
    var password = req.body.password || '';
    if (username == '' || password == '') {
      var retObj = {
        "status": 401,
        "message": "INVALID_CREDENTIALS"
      };
      res.status(401);
      res.json(retObj);
      return JSON.stringify(retObj);
    }

    var dbUserObj = null; // new Auth().test_genDummyUserObj();

    var recordQueryString = { "username" : username, "password" : password };

    req.collections.users.find(recordQueryString).toArray(function(error, records) {

      if (error) {
        var retObj = {
          "status": 500,
          "message": "Error while authenticating user."
        };
        res.status(500);
        res.json(retObj);
        return JSON.stringify(retObj);
      }

      if (records.length == 0) {
        res.status(401);
        res.json({
          "status": 401,
          "message": "INVALID_CREDENTIALS"
        });
        return;
      }
      // authentication is successfull, then generate a token and dispatch it to the client
      res.json(genToken(records[0],7,require('./secret')()));

    });

};
Auth.prototype.validateRequest= function(req, res, next) {

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

      // TBD Authorize the user to see if s/he can access our resources
      // decode.organization
      // decode.role
      if (false) {   // add logic to restrict access here (e.g. check for url, org and role)
        return returnFunction(res, 403, "NOT_AUTHORIZED");
      }

      next(); // To move to next middleware

    } catch (err) {
      return returnFunction(res, 500, "TOKEN_DECODING_ERROR");
    }
  } else {
    return returnFunction(res, 401, "INVALID_TOKEN_OR_KEY");
  }
};

Auth.prototype.test_genExpiredToken = function(userObj,secret) {
    return genToken(userObj,0,secret);
};
Auth.prototype.test_genValidToken = function(userObj, secret) {
    return genToken(userObj,1,secret);
};
Auth.prototype.test_genDummyInvalidUserObj = function() {
    return { name: 'joebot', role: 'admin', username: 'joe@bot.com'};
};
Auth.prototype.test_genDummyUserObj = function() {
    return { name: 'joedoe', role: 'admin', username: 'joe@doe.com'};
};
Auth.prototype.usersCRUD = users_crud;

// private methods
function genToken(user, nbrOfDays, secret) {
  var expires = expiresIn(nbrOfDays); // 7 days
  var token = jwt.encode({
    exp: expires,
    username: user.username,
    organization: user.organization,
    role: user.role
  }, secret);
  return {
    token: token,
    expires: expires,
    user: user
  };
}
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
function returnFunction(res, statusCode, message) {
  var retObj= {
    "status": statusCode,
    "message": message
  };
  res.status(statusCode);
  res.json(retObj);
  return JSON.stringify(retObj);
}
module.exports = Auth;

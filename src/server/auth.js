var jwt = require('jwt-simple');

var auth = {

  // curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://127.0.0.1:8085/login

  // curl -H "Content-Type: application/json" -X GET -d '{"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NTk3NTA2OTg4MDV9.5J2KlDURlFrFWzS0Cjokyk5JtGI1e5f7z6Iv90jgAOE","x_key":"arvind@myapp.com"}' http://127.0.0.1:8085/api/v1/listAnchorTypes

  login: function(req, res) {
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

    var dbUserObj = auth.validate(username, password);

    if (!dbUserObj) { // If authentication fails, we send a 401 back
      res.status(401);
      res.json({
        "status": 401,
        "message": "INVALID_CREDENTIALS"
      });
      return;
    }

    // authentication is successfull, then generate a token and dispatch it to the client
    res.json(genToken(dbUserObj,7,require('./secret')()));

  },
  validate: function(username, password) {
    // spoofing the DB response for simplicity
    var dbUserObj = this.test_genDummyUserObj();
    return dbUserObj;
  },
  authorizeUser: function(username, url) {
    // spoofing the DB response for simplicity
    var dbUserObj = null;
    if (username == "joe@doe.com") {
      dbUserObj = this.test_genDummyUserObj();
    }
    return dbUserObj;
  },
  test_genExpiredToken: function(userObj,secret) {
    return genToken(userObj,0,secret);
  },
  test_genValidToken: function(userObj, secret) {
    return genToken(userObj,1,secret);
  },
  test_genDummyInvalidUserObj: function() {
    return { name: 'joebot', role: 'admin', username: 'joe@bot.com'};
  },
  test_genDummyUserObj: function() {
    return { name: 'joedoe', role: 'admin', username: 'joe@doe.com'};
  }
}
// private methods
function genToken(user, nbrOfDays, secret) {
  var expires = expiresIn(nbrOfDays); // 7 days
  var token = jwt.encode({
    exp: expires,
    username: user.username
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
module.exports = auth;

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
    res.json(genToken(dbUserObj));

  },
  validate: function(username, password) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB.
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    };
    return dbUserObj;
  },
  validateUser: function(username) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB.
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    };
    return dbUserObj;
  },
}
// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('./secret')());
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

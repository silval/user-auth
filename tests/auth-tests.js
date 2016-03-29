var chai = require('chai');
var expect = chai.expect
  , should = chai.should();

describe('auth unit tests', function() {

  var auth = require(__dirname+'/../src/server/auth.js');

  // login
  it('login() should return INVALID_CREDENTIALS error if no object ID is in request', function() {
    expect(auth.login({ "body" : {} },{ "status" : function () {} , "json" : function() {}},function(msg){ return msg})).to.have.string("INVALID_CREDENTIALS");
  });

  // authorizeUser
  it('authorizeUser() should return null if user is not authorized', function() {
    expect(auth.authorizeUser(auth.test_genDummyInvalidUserObj().username)).to.have.null;
  });


});

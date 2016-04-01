var chai = require('chai');
var expect = chai.expect
  , should = chai.should();
var Auth = require(__dirname+'/../src/server/auth');

describe('auth unit tests', function() {

  var auth = new Auth();

  // login
  it('login() should return INVALID_CREDENTIALS error if no object ID is in request', function() {
    expect(auth.login({ "body" : {} },{ "status" : function () {} , "json" : function() {}},function(msg){ return msg})).to.have.string("INVALID_CREDENTIALS");
  });

  // validateRequest
  it('validateRequest() should return INVALID_TOKEN_OR_KEY error if no token/key is in request', function() {
    expect(auth.validateRequest({ "body" : {}, "headers": {} },{ "status" : function () {} , "json" : function() {}},function(msg){ return msg})).to.have.string("INVALID_TOKEN_OR_KEY");
  });
  it('validateRequest() should return TOKEN_EXPIRED error if no token/key is in request', function() {
    var expiredToken = auth.test_genExpiredToken(auth.test_genDummyUserObj,require('./../src/server/secret')());
    expect(auth.validateRequest({ "body" : { "access_token" : expiredToken.token, "x_key" : expiredToken.user.username }, "headers": {} },{ "status" : function () {} , "json" : function() {}},function(msg){ return msg})).to.have.string("TOKEN_EXPIRED");
  });

  it('validateRequest() should return TOKEN_DECODING_ERROR error if invalid token is in request', function() {
    expect(auth.validateRequest({ "body" : { "access_token" : "1234", "x_key" : "bla" }, "headers": {} },{ "status" : function () {} , "json" : function() {}},function(msg){ return msg})).to.have.string("TOKEN_DECODING_ERROR");
  });

  it('validateRequest() should return INVALID_CREDENTIALS error if token userid does not match key', function() {
    var token = auth.test_genValidToken(auth.test_genDummyInvalidUserObj(),require('./../src/server/secret')());
    expect(auth.validateRequest({ "body" : { "access_token" : token.token, "x_key" : "bla" }, "headers": {} },{ "status" : function () {} , "json" : function() {}},function(msg){ return msg})).to.have.string("INVALID_CREDENTIALS");
  });

  // it('validateRequest() should return NOT_AUTHORIZED error if user is not authorized', function() {
  //   var token = auth.test_genValidToken(auth.test_genDummyInvalidUserObj(),require('./../src/server/secret')());
  //   expect(auth.validateRequest({ "body" : { "access_token" : token.token, "x_key" : token.user.username }, "headers": {} },{ "status" : function () {} , "json" : function() {}},function(msg){ return msg})).to.have.string("NOT_AUTHORIZED");
  // });

});

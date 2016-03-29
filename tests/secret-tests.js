var chai = require('chai');
var expect = chai.expect
  , should = chai.should();
process.env.TOKEN_SECRET = "my.new.secret";

describe('secret unit tests', function() {

  var secret = require(__dirname+'/../src/server/secret.js');

  it('secret should return process.env.TOKEN_SECRET environment variable as the secret key', function() {
    expect(secret()).to.equal(process.env.TOKEN_SECRET);
  });

});

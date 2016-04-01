var chai = require('chai');
var expect = chai.expect
  , should = chai.should();
var Users = require(__dirname+'/../src/server/Users');

describe('Users CRUD Unit tests', function() {

  var usersObj = new Users();

  // GET
  it('getRecord() should return NO_RECORD_ID_PROVIDED error if no object ID is in request', function() {
    expect(usersObj.getRecord({ "params" : {} },null,function(msg){ return msg})).to.be.equal("NO_RECORD_ID_PROVIDED");
  });

  // FIND
  it('findRecords() should return PAGE_NUMBER_INVALID error if pageNumber is lower than 1', function() {
    expect(usersObj.findRecords({ "query" : { "p" : "0", "q" : "{}" }},null,function(msg){ return msg})).to.be.equal("PAGE_NUMBER_INVALID");
  });

  it('findRecords() should return JSON_PARSING_ERROR error if if malformed query json object is in request', function() {
    expect(usersObj.findRecords({ "query" : { "p" : "0", "q" : "{ 'hello' }"}},null,function(msg){ return msg})).to.have.string("JSON_PARSING_ERROR");
  });

  // ADD
  it('addRecord() should return NO_RECORD_PAYLOAD_PROVIDED error if no record json object is in request', function() {
    expect(usersObj.addRecord({ "body" : {} },null,function(msg){ return msg})).to.be.equal("NO_RECORD_PAYLOAD_PROVIDED");
  });

  it('addRecord() should return JSON_PARSING_ERROR error if if malformed query json object is in request', function() {
    expect(usersObj.addRecord({ "body" : { "record": "{'hello'}" } },null,function(msg){ return msg})).to.have.string("JSON_PARSING_ERROR");
  });

  // DELETE
  it('delRecord() should return NO_RECORD_ID_PROVIDED error if no object ID is in request', function() {
    expect(usersObj.delRecord({ "params" : {} },null,function(msg){ return msg})).to.be.equal("NO_RECORD_ID_PROVIDED");
  });

  // EDIT
  it('editRecord() should return NO_RECORD_ID_PROVIDED error if no object ID is in request', function() {
    expect(usersObj.editRecord({ "body" : {}, "params" : { } },null,function(msg){ return msg})).to.be.equal("NO_RECORD_ID_PROVIDED");
  });

  it('editRecord() should return NO_RECORD_PAYLOAD_PROVIDED error if no object ID is in request', function() {
    expect(usersObj.editRecord({ "body" : {}, "params" : { "id" : "1"} },null,function(msg){ return msg})).to.be.equal("NO_RECORD_PAYLOAD_PROVIDED");
  });

  it('editRecord() should return JSON_PARSING_ERROR error if if malformed query json object is in request', function() {
    expect(usersObj.editRecord({ "body" : { "record" : "{'hello'}" }, "params" : { "id" : "1"} },null,function(msg){ return msg})).to.have.string("JSON_PARSING_ERROR");
  });

});

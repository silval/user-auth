var chai = require('chai');
var expect = chai.expect
  , should = chai.should();
var Anchors = require(__dirname+'/../src/anchors/Anchors');
var AnchorTypes = require(__dirname+'/../src/anchors/AnchorTypes');

// var Messages = require(__dirname+'/../src/nls/NLS');

describe('Anchor Types CRUD Unit tests', function() {

  var anchorsObj = new Anchors();
  var anchorTypesObj = new AnchorTypes();
  // var nls = new Messages();

  // GET
  it('getRecord() should return NO_RECORD_ID_PROVIDED error if no object ID is in request', function() {
    expect(anchorTypesObj.getRecord({ "params" : {} },null,function(msg){ return msg})).to.be.equal("NO_RECORD_ID_PROVIDED");
  });

  // FIND
  it('findRecords() should return PAGE_NUMBER_INVALID error if pageNumber is lower than 1', function() {
    expect(anchorTypesObj.findRecords({ "query" : { "page" : "0", "q" : "{}" }},null,function(msg){ return msg})).to.be.equal("PAGE_NUMBER_INVALID");
  });

  it('findRecords() should return JSON_PARSING_ERROR error if if malformed query json object is in request', function() {
    expect(anchorTypesObj.findRecords({ "query" : { "page" : "0", "q" : "{ 'hello' }"}},null,function(msg){ return msg})).to.have.string("JSON_PARSING_ERROR");
  });

  // ADD
  it('addRecord() should return NO_RECORD_PAYLOAD_PROVIDED error if no record json object is in request', function() {
    expect(anchorTypesObj.addRecord({ "body" : {} },null,function(msg){ return msg})).to.be.equal("NO_RECORD_PAYLOAD_PROVIDED");
  });

  it('addRecord() should return JSON_PARSING_ERROR error if if malformed query json object is in request', function() {
    expect(anchorTypesObj.addRecord({ "body" : { "record": "{'hello'}" } },null,function(msg){ return msg})).to.have.string("JSON_PARSING_ERROR");
  });

  // DELETE
  it('delRecord() should return NO_RECORD_ID_PROVIDED error if no object ID is in request', function() {
    expect(anchorTypesObj.delRecord({ "params" : {} },null,function(msg){ return msg})).to.be.equal("NO_RECORD_ID_PROVIDED");
  });

  // EDIT
  it('editRecord() should return NO_RECORD_ID_PROVIDED error if no object ID is in request', function() {
    expect(anchorTypesObj.editRecord({ "body" : {}, "params" : { } },null,function(msg){ return msg})).to.be.equal("NO_RECORD_ID_PROVIDED");
  });

  it('editRecord() should return NO_RECORD_PAYLOAD_PROVIDED error if no object ID is in request', function() {
    expect(anchorTypesObj.editRecord({ "body" : {}, "params" : { "id" : "1"} },null,function(msg){ return msg})).to.be.equal("NO_RECORD_PAYLOAD_PROVIDED");
  });

  it('editRecord() should return JSON_PARSING_ERROR error if if malformed query json object is in request', function() {
    expect(anchorTypesObj.editRecord({ "body" : { "record" : "{'hello'}" }, "params" : { "id" : "1"} },null,function(msg){ return msg})).to.have.string("JSON_PARSING_ERROR");
  });

});

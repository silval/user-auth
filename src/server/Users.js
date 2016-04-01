var mongoskin = require('mongoskin');
var CommonCRUD = require('common-artifacts').commonCRUD;

function Users() {
}

Users.prototype = CommonCRUD;

module.exports = Users;

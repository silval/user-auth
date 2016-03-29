module.exports = function() {
  return process.env.TOKEN_SECRET || 'secret.secret.secret';
}

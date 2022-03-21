const S = require('fluent-json-schema');

exports.signUpSchema = S.object()
  .prop('first', S.string().required())
  .prop('last', S.string().required())
  .prop('email', S.string().required())
  .prop('password', S.string().minLength(3).required())
  .prop('repassword', S.string().minLength(3).required())
  .prop('phone', S.string().required())
  .valueOf();

exports.loginSchema = S.object()
  .prop('email', S.string().required())
  .prop('password', S.string().minLength(3).required())
  .valueOf();

exports.petSchema = S.object()
  .prop('name', S.string().required())
  .prop('type', S.string().required())
  .valueOf();
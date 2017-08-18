var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];

exports.findById = function(id, cb) {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
}

exports.findByUsername = function(username, cb) {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
}

exports.push = function(req, cb) {
  var record = {
    id: records.length+1,
    username: req.username,
    password: req.password,
    displayName: req.displayName,
    emails: [ { value: req.emails } ]
  }
  records.push(record);
  return cb(null, record);
}

"use strict";

var util = require('util');
var through = require('through');
var path = require('path');

function strictify(file, opts) {
  opts = opts || {};

  var stream = through(write, end);
  var applied = false;

  return stream;

  function write(buf) {
    if (!applied && (opts.exclude || []).indexOf(
          path.extname(file).replace('.', '')) < 0) {
      stream.queue('"use strict";\n');
      applied = true;
    }
    stream.queue(buf);
  }

  function end() {
    stream.queue(null);
  }
}

module.exports = strictify;

'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var server = require('server');
var assert = require('chai').assert;

lab.experiment('Testing math', function() {
  lab.test('returns true when 1 + 1 equals 2', function(done) {
      assert((1 + 1),2);
      done();
  });
})

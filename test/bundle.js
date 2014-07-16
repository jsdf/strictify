"use strict";
var test = require('tap').test;
var browserify = require('browserify');

function bundle (file) {
    test('bundle transform', function (t) {
        t.plan(1);

        var b = browserify();
        b.add(__dirname + file);
        b.transform(__dirname + '/..');
        b.bundle(function (err, src) {
            if (err) t.fail(err);
            t.ok(src.match(/"use strict";/), "has strict mode statement");
        });
    });
}

bundle('/../example/neat-module.js');

'use strict';
var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    gutil = require('gulp-util'),
    filterBy = require('./');


describe('filterBy()', function () {
	it('should execute filter function', function (cb) {
		var stub = sinon.stub().returns(true);

		var stream = filterBy(stub);
		var buffer = [];

		stream.on('data', function (file) {
			buffer.push(file);
		});

		stream.on('end', function () {
			expect(stub.called).to.equal(true);
			cb();
		});

		stream.write(new gutil.File({
			base: __dirname,
			path: __dirname + '/included.js'
		}));

		stream.end();
	});

	it('should include files if the filter returns true', function (cb) {
		var stub = sinon.stub().returns(true);

		var stream = filterBy(stub);
		var buffer = [];

		stream.on('data', function (file) {
			buffer.push(file);
		});

		stream.on('end', function () {
			expect(buffer.length).to.equal(2);
			expect(stub.callCount).to.equal(2);
			cb();
		});

		stream.write(new gutil.File({path: 'file1.scss'}));
		stream.write(new gutil.File({path: 'file2.scss'}));

		stream.end();
	});

	it('should exclude files if the filter returns false', function (cb) {
		var stub = sinon.stub().returns(false);

		var stream = filterBy(stub);
		var buffer = [];

		stream.on('data', function (file) {
			buffer.push(file);
		});

		stream.on('end', function () {
			expect(buffer.length).to.equal(0);
			expect(stub.callCount).to.equal(2);
			cb();
		});

		stream.write(new gutil.File({path: 'file1.scss'}));
		stream.write(new gutil.File({path: 'file2.scss'}));

		stream.end();
	});
});
var through = require('through2'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-filter-by';

function filterBy(fn) {
	"use strict";

	if (!fn || typeof fn !== 'function') {
		throw new PluginError(PLUGIN_NAME, '`fn` must be a function');
	}

	// creating a stream through which each file will pass
	var stream = through.obj(function(file, enc, cb) {

		// Run the filter, which will return either true or false
		if(fn(file)) {
			// make sure the file goes through the next gulp plugin
			this.push(file);
		}

		// tell the stream engine that we are done with this file
		cb();
	});

	// returning the file stream
	return stream;
}

// exporting the plugin main function
module.exports = filterBy;
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-filter-by';

function filterBy(fn) {
  if (!fn) {
    throw new PluginError(PLUGIN_NAME, 'Missing filter function!');
  }

  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

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
};

// exporting the plugin main function
module.exports = filterBy
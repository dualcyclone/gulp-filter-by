var gulp = require('gulp'),
    gutil = require('gulp-util'), 
    jshint = require('gulp-jshint'),
    istanbul = require('gulp-istanbul'),
    mocha = require('gulp-mocha');

var catchAll = ['./lib/*.js', './test/*.js'];

function jshintHelper(filename) {
	var src = filename ? filename : catchAll;
	return gulp.src(src)
        	.pipe(jshint())
        	.pipe(jshint.reporter('jshint-stylish'));
};

gulp.task('jshint', function(cb) {
	jshintHelper();
});

gulp.task('watch', function (cb) {
	gulp.watch(catchAll, function(evt) {
		jshintHelper(evt.path);
	});
});

gulp.task('test', function(cb) {
	return gulp.src(catchAll[0])
		.pipe(istanbul())
		.on('finish', function() {
			gulp.src(catchAll[1])
				.pipe(mocha())
				.pipe(istanbul.writeReports());
		})
});
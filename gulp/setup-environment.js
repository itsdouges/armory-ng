'use strict';

var gulp = require('gulp');
var template = require('gulp-template');

gulp.task('build:env', function () {
	var data = require('../environment/local-dev.json');

    return gulp.src('../src/app/app.env.js')
        .pipe(template({
        	env: data
        }))
        .pipe(gulp.dest('../.tmp'));
});
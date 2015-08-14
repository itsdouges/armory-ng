'use strict';

var path = require('path');
var conf = require('./conf');

var gulp = require('gulp');
var template = require('gulp-template');
var data = require('gulp-data');

gulp.task('env:dev', function () {
	var env_data = require('../environment/local-dev.json');

    return gulp.src(path.join(conf.paths.templates, '/app.env.js'))
		.pipe(data(function () {
            return {
            	env: env_data
            };
        }))
        .pipe(template())
        .pipe(gulp.dest(path.join(conf.paths.src, '/app')));
})
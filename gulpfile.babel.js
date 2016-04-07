'use strict';

import 'babel-polyfill';

import gulp from 'gulp';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';

gulp.task('lint', function () {
    return gulp.src(['**/*.js','!node_modules/**'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('test', function () {
  return gulp.src('tests/**/*.js')
    .pipe(mocha());
});

gulp.task('default', ['lint'], function () {
  console.log('gulp launched ok');
});

'use strict';

import 'babel-polyfill';

import gulp from 'gulp';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';
// import babel from 'gulp-babel';

gulp.task('lint', () =>
  gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('test', () =>
  gulp.src(['tests/**/*.js', , '!node_modules/**'])
    .pipe(mocha())
);

gulp.task('watch', () =>
  gulp.watch(['**/*.js', '!node_modules/**'], ['lint'])
);

gulp.task('watch-test', () =>
  gulp.watch(['**/*.js', '!node_modules/**'], ['test'])
);

gulp.task('default', ['watch', 'watch-test'], () => {
  // console.log('gulp launched ok');
});

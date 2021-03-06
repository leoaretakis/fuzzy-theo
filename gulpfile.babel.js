'use strict';

import 'babel-polyfill';
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';
import coverageEnforcer from 'gulp-istanbul-enforcer';
import istanbul from 'gulp-istanbul';
import { Instrumenter } from 'isparta';
import plumber from 'gulp-plumber';
import codacy from 'gulp-codacy';
import babel from 'gulp-babel';
import del from 'del';
import path from 'path';
import { spawn } from 'child_process';


const excludedFiles = ['!node_modules/**', '!coverage/**', '!html-report/**'];

const dirs = {
  coverageRoot: path.join(__dirname, 'coverage/'),
  sourceRoot: path.join(__dirname, 'src'),
  testRoot: path.join(__dirname, 'test'),
  libRoot: path.join(__dirname, 'lib'),
};

const files = {
  tests: path.join(dirs.testRoot, '/**/*.js'),
  source: path.join(dirs.sourceRoot, '/**/*.js'),
  entryPoint: path.join(dirs.sourceRoot, 'index.js'),
};

const istanbulCovReportConfig = {
  dir: dirs.coverageRoot,
  reportOpts: { dir: dirs.coverageRoot },
  reporters: ['text', 'text-summary', 'json', 'html', 'lcov'],
};

const coverageEnforceConfig = {
  thresholds: {
    statements: 80,
    branches: 50,
    lines: 80,
    functions: 50,
  },
  coverageDirectory: dirs.coverageRoot,
  rootDirectory: '',
};

gulp.task('build', () => gulp.src(files.source)
  .pipe(babel())
  .pipe(gulp.dest(dirs.libRoot))
);

gulp.task('watch-build', () => gulp.watch(files.source, ['build']));

gulp.task('clean-coverage', (done) => del([dirs.coverageRoot, 'html-report/'], done));

gulp.task('test-coverage', ['clean-coverage'], (done) => gulp
  .src([files.source, files.entryPoint, ...excludedFiles])
  .pipe(istanbul({ instrumenter: Instrumenter, includeUntested: true }))
  .pipe(istanbul.hookRequire()) // Force `require` to return covered files
  .on('finish', () => {
    gulp.src([files.tests, ...excludedFiles], { read: false })
      .pipe(plumber())
      .pipe(mocha({ reporter: 'spec' }))
      .pipe(istanbul.writeReports(istanbulCovReportConfig))
      .pipe(coverageEnforcer(coverageEnforceConfig))
      .pipe(plumber.stop())
      .on('finish', () => {
        if (process.env.CODACY_PROJECT_TOKEN) {
          gulp.src(['./coverage/lcov.info'])
            .pipe(codacy({ token: process.env.CODACY_PROJECT_TOKEN }))
            .on('end', done);
        }
      });
  })
);

gulp.task('lint', () =>
  gulp.src([files.source, files.tests, ...excludedFiles])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('test', () =>
  gulp.src([files.tests, ...excludedFiles])
    .pipe(mocha())
);

gulp.task('watch', () =>
  gulp.watch([files.source, files.tests, ...excludedFiles], ['lint'])
);

gulp.task('watch-test', () =>
  gulp.watch([files.source, files.tests, ...excludedFiles], ['test'])
);

gulp.task('npm-patch', (done) => {
  spawn('npm', ['version', 'patch'], { stdio: 'inherit' })
    .on('close', () => {
      spawn('npm', ['publish'], { stdio: 'inherit' })
        .on('close', done);
    });
});

gulp.task('default', ['lint', 'test-coverage']);

'use strict';

import 'babel-polyfill';
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';
import coverageEnforcer from 'gulp-istanbul-enforcer';
import istanbul from 'gulp-istanbul';
import { Instrumenter } from 'isparta';
import plumber from 'gulp-plumber';
import del from 'del';
import path from 'path';
import { spawn } from 'child_process';


const excludedFiles = ['!node_modules/**', '!coverage/**', '!html-report/**'];

const dirs = {
  coverageRoot: path.join(__dirname, 'coverage/'),
  sourceRoot: path.join(__dirname, 'src'),
  testRoot: path.join(__dirname, 'test'),
};

const files = {
  tests: path.join(dirs.testRoot, '/**/*.js'),
  source: path.join(dirs.sourceRoot, '/**/*.js'),
  allJs: path.join(__dirname, '/**/*.js'),
  entryPoint: 'index.js',
};

gulp.task('clean-coverage', (cb) => del([dirs.coverageRoot, 'html-report/'], cb));

gulp.task('test-coverage', ['clean-coverage'], (cb) => {
  const coverageDir = dirs.coverageRoot;

  gulp.src([files.source, files.entryPoint, ...excludedFiles])
    .pipe(istanbul({ instrumenter: Instrumenter, includeUntested: true }))
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', () => {
      gulp.src([files.tests, ...excludedFiles], { read: false })
        .pipe(plumber())
        .pipe(mocha({ reporter: 'spec' }))
        .pipe(istanbul.writeReports({
          dir: coverageDir,
          reportOpts: { dir: coverageDir },
          reporters: ['text', 'text-summary', 'json', 'html', 'lcov'],
        }))
        .pipe(coverageEnforcer({
          thresholds: {
            statements: 80,
            branches: 50,
            lines: 80,
            functions: 50,
          },
          coverageDirectory: coverageDir,
          rootDirectory: '',
        }))
        .pipe(plumber.stop())
        .on('end', cb);
    });
});

gulp.task('lint', () =>
  gulp.src([files.allJs, ...excludedFiles])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('test', () =>
  gulp.src([files.tests, ...excludedFiles])
    .pipe(mocha())
);

gulp.task('watch', () =>
  gulp.watch([files.allJs, ...excludedFiles], ['lint'])
);

gulp.task('watch-test', () =>
  gulp.watch([files.allJs, ...excludedFiles], ['test'])
);

gulp.task('npm-patch', (done) => {
  spawn('npm', ['version', 'patch'], { stdio: 'inherit' })
    .on('close', () => {
      spawn('npm', ['publish'], { stdio: 'inherit' })
        .on('close', done);
    });
});

gulp.task('npm-minor', (done) => {
  spawn('npm', ['version', 'minor'], { stdio: 'inherit' })
    .on('close', () => {
      spawn('npm', ['publish'], { stdio: 'inherit' })
        .on('close', done);
    });
});

gulp.task('default', ['lint', 'test-coverage']);

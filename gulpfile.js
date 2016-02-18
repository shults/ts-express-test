'use strict';

const
  gulp = require('gulp'),
  runSequence = require('run-sequence'),
  server = require('gulp-express'),
  tsconfig = require('gulp-tsconfig'),
  del = require('del'),
  ts = require('gulp-typescript');

const config = {
  compilerOptions: {
    'target': 'es5',
    'module': 'commonjs',
    'sourceMap': false
  },
  src: {
    filesGlob: [
      'typings/tsd.d.ts',
      'src/**/*.ts'
    ]
  }
}

gulp.task('watch', ['tsconfig:watch']);

gulp.task('ts', function() {
  return gulp.src(['src/**/*.ts'])
    .pipe(ts(config.compilerOptions))
    .pipe(gulp.dest('./dist'))
})

gulp.task('dist:clean', function(done) {
  del('./dist').then(() => done(), done)
})

gulp.task('tsconfig', function() {
  var tsConfig = tsconfig({
    tsConfig: {
      filesGlob: config.src.filesGlob,
      compilerOptions: config.compilerOptions,
      atom: {
        rewriteTsconfig: false
      },
      buildOnSave: false,
      compileOnSave: false
    }
  });

  return gulp.src(config.src.filesGlob)
    .pipe(tsConfig())
    .pipe(gulp.dest('.'));
})

gulp.task('tsconfig:watch', ['tsconfig'], function () {
  gulp.watch(config.src.tsFilesGlob, ['tsconfig']);
});

gulp.task('compile', function(done) {
  runSequence(
    'tsconfig',
    'ts',
    done
  )
})


gulp.task('server', function(done) {
  runSequence(
    'dist:clean',
    'compile',
    function(err) {
      // console.log(err)
      // if (err) return done(err);
      //
      server.run(['dist/server.js'])
      
      gulp.watch(['dist/**/*'], server.run)
      gulp.watch(['src/**/*.ts'], ['compile'])
    }
  )
})

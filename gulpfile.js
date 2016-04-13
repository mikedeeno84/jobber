var gulp = require('gulp');
var runSeq = require('run-sequence');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
// var minifyCSS = require('gulp-minify-css');

var webpack = require('webpack-stream');

// var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
// var eslint = require('gulp-eslint');
// var mocha = require('gulp-mocha');
// var karma = require('karma').server;
// var istanbul = require('gulp-istanbul');
var notify = require('gulp-notify');

gulp.task('reload', function() {
  livereload.reload();
});

gulp.task('reloadCSS', function() {
  return gulp.src('./public/style.css').pipe(livereload());
});

gulp.task('buildJS', [], function() {
  // array containting point of entry and where to find the rest of the files
  return gulp.src(['./browser/js/app.js', './browser/js/**/*.js*'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public'));
});

gulp.task('buildCSS', function() {
  var sassCompilation = sass();
  sassCompilation.on('error', console.error.bind(console));

  return gulp.src('./browser/scss/main.scss')
    .pipe(plumber({
      errorHandler: notify.onError('SASS processing failed! Check your gulp process.')
    }))
    .pipe(sassCompilation)
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./public'));

});

gulp.task('build', function() {
  // if (process.env.NODE_ENV === 'production'){
  runSeq(['buildJS', 'buildCSS']);
  // }
});

gulp.task('default', function() {
  gulp.start('build');

  gulp.watch('browser/**/*.js*', function() {
    runSeq('buildJS', 'reload')
  });

  gulp.watch('browser/scss/**', function() {
    runSeq('buildCSS', 'reloadCSS')
  });

  // reload when a template file changes
  // gulp.watch(['browser/**/*.html', 'server/app/views/*.html'], ['reload']);
  livereload.listen();

});

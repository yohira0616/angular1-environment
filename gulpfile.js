var gulp = require('gulp');
var concat = require('gulp-concat');
var browser = require('browser-sync');
var ngTemplateCache = require('gulp-angular-templatecache');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var del = require('del');
var runSequence = require('run-sequence');
var ngAnnotate = require('gulp-ng-annotate');


gulp.task('clean', function () {
  return del(['public/js/*.js', 'public/css/*.css', 'public/**/*.html']);
});

gulp.task('build', function (callback) {
  return runSequence(
    'clean',
    ['angular', 'templates', 'htdocs', 'scss'],
    callback
  );
});

gulp.task('angular', function () {
  return gulp.src('src/scripts/**/*.js')
    .pipe(plumber())
    .pipe(concat('bundle.min.js'))
    .pipe(ngAnnotate())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});


gulp.task('templates', function () {
  return gulp.src('src/templates/**/*.html')
    .pipe(ngTemplateCache({
      module: 'app'
    }))
    .pipe(gulp.dest('public/js'));
});

gulp.task('scss', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('htdocs', function () {
  return gulp.src('src/htdocs/*.html')
    .pipe(gulp.dest('./public/'));
});


gulp.task('server:init', function () {
  browser.init({
    server: {
      baseDir: "./public/"
    }
  });
});

gulp.task('server:reload', function () {
  return browser.reload();
});


gulp.task('develop', function (callback) {
  return runSequence(
    'build',
    'server:init',
    'watch',
    callback
  );
});


gulp.task('watch', function () {
  gulp.watch('src/htdocs/**/*.html', ['htdocs', 'server:reload']);
  gulp.watch('src/scripts/**/*.js', ['angular', 'server:reload']);
  gulp.watch('src/scss/**/*.scss', ['scss', 'server:reload']);
  gulp.watch('src/templates/**/*.html', ['templates', 'server:reload']);
});
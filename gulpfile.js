var gulp = require('gulp');
var sass = require("gulp-sass");
var watch = require('gulp-watch');
var nodemon = require('gulp-nodemon');
var browserSync = require("browser-sync").create();

gulp.task('sass', function () {
  //if other tasks depend on this task, it must return something
  return gulp.src('./public/style/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public/style'));
});

gulp.task('watch', function () {
  gulp.watch('./public/style/style.scss', ['sass']);
});

gulp.task('start', function () {
  browserSync.init({
    proxy: "localhost:8080",
    files: ['**/*.css', '**/*.html', '**.js'],
    open: false
  });
  nodemon({
    script: 'index.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  }).on('start', function(){
    browserSync.reload();
  });
});

gulp.task('default', ['start', 'sass', 'watch'], function(){
  console.log('gulp is on...');
});

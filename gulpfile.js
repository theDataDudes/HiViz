var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {
  return gulp.src('./src/sass/styles.scss')
      .pipe(sass({
        errLogToConsole : true,
        includePaths: ['bower_components/foundation/scss']
      }).on('error', sass.logError))
      .pipe(gulp.dest('./public/css/'));
});

gulp.task('browserify', () => {
  gulp.src('src/modules/app.js')
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.js', ['browserify']);
  gulp.watch('./src/sass/**/*', ['sass']);
  gulp.watch(['./views/**/*', './public/**/*'], livereload.changed);
  livereload.listen(35729);
});

gulp.task('start', function () {
  nodemon({
    script : './app/server.js',
    ext : 'js html',
    env : { 'NODE_ENV' : 'development' }
  })
  .on('restart', function () {
    console.log('going to restart server!');
    setTimeout(function() {

      console.log('restarted server!');
      livereload.changed('./app/server.js');

    }, 500);

  });

});

gulp.task('default', ['watch', 'sass', 'browserify', 'start']);

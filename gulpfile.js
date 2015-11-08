var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
      .pipe(sass({
        errLogToConsole : true,
        sourceComments : true, //adds comments to css //remove for final minify build
        includePaths: ['bower_components/foundation/scss']
      }).on('error', sass.logError))
      .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function () {
  gulp.watch('./src/sass/**/*', ['sass']);
  gulp.watch(['./views/**/*', './public/**/*'], livereload.changed);
  livereload.listen(35729);
});

gulp.task('start', function () {
  nodemon({
    script : 'server.js',
    ext : 'js html',
    env : { 'NODE_ENV' : 'development' }
  })
  .on('restart', function () {
    console.log('going to restart server!');
    setTimeout(function() {

      console.log('restarted server!');
      livereload.changed('server.js');

    }, 500);

  });

});

gulp.task('default', ['watch', 'sass', 'start']);
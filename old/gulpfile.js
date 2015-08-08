// Base Gulp File - Compiling LESS/SCSS
var gulp = require('gulp'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  less = require('gulp-less'),
  path = require('path'),
  notify = require('gulp-notify'),
  browserify = require("browserify"),
  uglify = require("gulp-uglify"),
  sourcemaps = require("gulp-sourcemaps"),
  source = require("vinyl-source-stream"),
  buffer = require("vinyl-buffer");


gulp.task('javascript', function () {
  var b = browserify({
    entries: ["./src/js/default.js"],
    debug: true
  });

  return b.bundle()
    .pipe(source("src/js/default.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(uglify())
      .on('error', function (err) { return console.log(err.message); })
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./js/"))
});

gulp.task('sass', function () {
  gulp.src('scss/style.scss')
    .pipe(sass({
      errLogToConsole: false,
      paths: [ path.join(__dirname, 'scss', 'includes') ]
    })
    /*.on("error", notify.onError(function(error) {
      return "Failed to Compile SCSS: " + error.message;
    })))*/
    .on("error", function(error) {
      return console.log("Failed to Compile SCSS: " + error.message);
     }))
    .pipe(gulp.dest('./'));
    //.pipe(notify("SCSS Compiled Successfully :)"));
    //.pipe(console.log("SCSS Compiled Successfully :)"));
});

gulp.task('less', function () {
  gulp.src('less/style.less')
    .pipe(less({ paths: [ path.join(__dirname, 'less', 'includes') ]
  })
  .on('error', function(err) {
    this.emit('end');
  }))
  /*.on("error", notify.onError(function(error) {
    return "Failed to Compile LESS: " + error.message;
  }))*/
  .on("error", function(error) {
    return console.log("Failed to Compile LESS: " + error.message);
   })
  .pipe(gulp.dest('./'));
  //.pipe(notify("LESS Compiled Successfully :)"));
  //.pipe(console.log("LESS Compiled Successfully :)"));
});

gulp.task('build', function () {
  gulp.src('src/js/default.js')
    .pipe(gulp.dest('./'));
  gulp.src('scss/style.scss')
    .pipe(gulp.dest('./'));
  gulp.src('less/style.less')
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
   gulp.watch('src/js/**/*', ['javascript']);
   gulp.watch('scss/**/*', ['sass']);
   gulp.watch('less/**/*', ['less']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['javascript', 'less', 'sass']);

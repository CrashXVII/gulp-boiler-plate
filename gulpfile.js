const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();


const paths = {
  serve: "./dist",
  input: {
    js: "./src/**/*.js",
    scss: "./src/scss/*.scss"
  },
  output: {
    scss: "./dist/css/",
    js: "./dist/js/"
  }
}
//compile scss into css:
function style() {
  return gulp
    .src(paths.input.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.output.scss))
    .pipe(browserSync.stream());
}

//live reloading
function watch() {
  browserSync.init({
    server: {
      baseDir: paths.serve
    }
  });
  //This will just update CSS, without fully reloading the page
  gulp.watch(paths.input.scss, style);
  //These cause full page reloads
  gulp.watch('./dist/*.html').on('change', browserSync.reload);
  gulp.watch(paths.output.js).on('change', browserSync.reload);
}
exports.style = style;
exports.watch = watch;
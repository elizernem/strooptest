import gulp from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass";
const sass = gulpSass(dartSass);
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import csso from "postcss-csso";
import autoprefixer from "autoprefixer";
import browser from "browser-sync";
import { htmlValidator } from "gulp-w3c-html-validator";

export const styles = () => {
  return gulp
    .src("sass/style.scss", { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(gulp.dest("css", { sourcemaps: "." }));
};

const reload = (done) => {
  browser.reload();
  done();
};

export const validator = () => {
  return gulp
    .src("*.html")
    .pipe(htmlValidator.analyzer())
    .pipe(htmlValidator.reporter());
};

const watcher = () => {
  gulp.watch("sass/**/*.scss", gulp.series(styles));
  gulp.watch("js/*.js", gulp.series(reload));
  gulp.watch("*.html", gulp.series(reload));
};

const server = (done) => {
  browser.init({
    server: {
      baseDir: "start",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

export default gulp.series(styles, watcher, server);

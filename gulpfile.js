import gulp from "gulp";
import browserSync from "browser-sync";
import ejs from "gulp-ejs";
import ts from "gulp-typescript";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import rename from "gulp-rename";
import htmlbeautify from "gulp-html-beautify";
import autoprefixer from "gulp-autoprefixer";

function buildEjs(done) {
  gulp
    .src(["./src/ejs/**/*.ejs", "!./src/ejs/**/_*.ejs"])
    .pipe(ejs({}, {}, { ext: ".html" }))
    .on("error", console.log)
    .pipe(rename({ extname: ".html" }))
    .pipe(
      htmlbeautify({
        indent_size: 2,
        preserve_newlines: false,
        indent_inner_html: true,
        extra_liners: [],
      })
    )
    .pipe(gulp.dest("./dist/"));
  done();
}

function buildRawFiles(done) {
  gulp
    .src("./src/**/*.+(jpg|jpeg|JPG|JPEG|png|PNG|svg|ico|pdf|zip)")
    .pipe(gulp.dest("./dist/"));
  done();
}

function buildScripts(done) {
  gulp
    .src("./src/**/*.+(js|ts)")
    .pipe(ts({ allowJs: true }))
    .on("error", console.log)
    .pipe(gulp.dest("./dist/"));
  done();
}

function buildStyles(done) {
  gulp
    .src("./src/**/*.css")
    .pipe(autoprefixer())
    .pipe(gulp.dest("./dist/"));
  gulp
    .src("./src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./dist/"));
  done();
}

function buildFonts(done) {
  gulp
    .src("./src/**/*.+(eot|ttf|woff)")
    .pipe(gulp.dest("./dist/"));
  done();
}

function initBrowserSync(done) {
  browserSync.init({
    server: {
      baseDir: "./dist/",
      index: "index.html",
    },
    port: 3000,
    reloadOnRestart: true,
  })
  done()
}

function reload(done) {
  browserSync.reload();
  done();
}

function watch(done) {
  gulp.watch("./src/**/*.ejs", gulp.series(buildEjs, reload))
  gulp.watch(
    "./src/**/*.(jpg|jpeg|JPG|JPEG|png|PNG|svg|ico|pdf|zip)",
    gulp.series([buildRawFiles, reload])
  )
  gulp.watch("./src/**/*.(js|ts)", gulp.series(buildScripts, reload))
  gulp.watch("./src/**/*.(css|scss)", gulp.series(buildStyles, reload))
  gulp.watch("./src/**/*.(eot|ttf|woff)", gulp.series(buildFonts, reload))
  done()
}

gulp.task("build",
  gulp.parallel(
    buildEjs,
    buildRawFiles,
    buildScripts,
    buildStyles,
    buildFonts
  )
);

gulp.task("default",
  gulp.parallel(
    watch,
    gulp.series("build", initBrowserSync)
  )
);

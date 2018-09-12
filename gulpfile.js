'use strict';

let gulp = require("gulp");
let sass = require("gulp-sass");
let server = require("browser-sync");
let minify = require("gulp-csso");
let rename = require("gulp-rename");
let run = require("run-sequence");
let del = require("del");

gulp.task("sass", function () {
  gulp.src(["sass/style.scss"])
  .pipe(sass())
  .pipe(gulp.dest("css"));
});

gulp.task("style", function() {
  gulp.src("sass/style.scss")
  .pipe(sass())
  .pipe(gulp.dest("css"))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("css"))
  .pipe(server.reload({stream:true}));
});

gulp.task("serve", function() {
  server.init({
    server:"."
  });

  gulp.watch("sass/**/*.scss", ["style"]);
  gulp.watch("./*.html")
    .on("change", server.reload);

});

gulp.task("build", function(fn) {
  run("clean", "style", fn)
});


gulp.task("clean", function() {
  return del("css");
});

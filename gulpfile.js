var gulp = require('gulp'),
    browserSync = require("browser-sync").create(),
    sass = require("gulp-sass"),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename");

gulp.task("server", ['sass' , 'cabinet'], function () {
	browserSync.init({
		server: { baseDir: '.' }
	});
	gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('./scss/**/*.scss', ['sass'] );
    gulp.watch('./scss/**/*.scss', ['cabinet'] );
});

gulp.task('sass', function() {
    return gulp.src('./scss/style.scss')
      .pipe(plumber({
            errorHandler: notify.onError(function(err){
                  return {
                        title: 'Styles',
                        message: err.message
                  }
            })
      }))
      .pipe(sass())
      .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
      }))
      .pipe(cleanCSS())
      .pipe(gulp.dest('./css/'))
      .pipe(browserSync.stream());
});

gulp.task('cabinet', function() {
    return gulp.src('./scss/style.scss')
      .pipe(plumber({
            errorHandler: notify.onError(function(err){
                  return {
                        title: 'Styles',
                        message: err.message
                  }
            })
      }))
      .pipe(sass())
      .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
      }))
      .pipe(cleanCSS())
      .pipe(gulp.dest('./css/'))
      .pipe(browserSync.stream());
});


gulp.task('default', ['server']);
const gulp = require('gulp'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    minifyCSS = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    onError = require('./helpers/onError.js');

module.exports = (gulp, config, isDist) => {
    return (done) => {
        gulp.src(config.src.sass)
            .pipe(gulpif(!isDist, sourcemaps.init()))
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(sass())
            .pipe(rename(config.dist.min_css))
            .pipe(autoprefixer())
            .pipe(minifyCSS())
            .pipe(gulpif(!isDist, sourcemaps.write()))
            .pipe(gulp.dest(config.dist.css))
        done();
    };
};
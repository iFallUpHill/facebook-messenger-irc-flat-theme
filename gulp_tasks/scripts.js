const gulp            = require('gulp'),
      concat          = require('gulp-concat'),
      plumber         = require('gulp-plumber'),
      uglify          = require('gulp-uglify'),
      sourcemaps      = require('gulp-sourcemaps'),
      eslint          = require('gulp-eslint'),
      babel           = require('gulp-babel'),
      gulpif          = require('gulp-if'),
      stripDebug      = require('gulp-strip-debug'),
      onError         = require('./helpers/onError.js');

module.exports = (gulp, config , isDist) => {
    return () => {
        gulp.src(config.src.js)
            .pipe(gulpif(!isDist, sourcemaps.init()))
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(gulpif(isDist, stripDebug()))
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(babel({presets: ['es2015']}))
            .pipe(gulpif(isDist, uglify()))
            .pipe(concat(config.dist.min_js))
            .pipe(gulpif(!isDist, sourcemaps.write()))
            .pipe(gulp.dest(config.dist.js))
    };
};
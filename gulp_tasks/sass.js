const gulp            = require('gulp'),
      concat          = require('gulp-concat'),
      plumber         = require('gulp-plumber'),
      minifyCSS       = require('gulp-cssnano'),
      sass            = require('gulp-sass'),
      autoprefixer    = require('gulp-autoprefixer'),
      uglify          = require('gulp-uglify'),
      sourcemaps      = require('gulp-sourcemaps'),
      gulpif          = require('gulp-if'),
      onError         = require('./helpers/onError.js');

module.exports = (gulp, config , isDist) => {
    return () => {
        gulp.src(config.src.sass)
            .pipe(gulpif(!isDist, sourcemaps.init()))
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(sass())
            .pipe(concat(config.dist.min_css))
            .pipe(autoprefixer( {
                    remove: false,
                    browsers: [
                        'last 2 versions',
                        '> 5%',
                        'ie 8',
                        'ie 9',
                        'ios 7',
                        'android 4'
                    ]
                }
            ))
            .pipe(minifyCSS())
            .pipe(gulpif(!isDist, sourcemaps.write()))
            .pipe(gulp.dest(config.dist.css))
    };
};
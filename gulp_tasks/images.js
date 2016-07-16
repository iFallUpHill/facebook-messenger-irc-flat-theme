const gulp = require('gulp');

module.exports = (gulp, config , isDist) => {
    return () => {
         gulp.src(config.src.img)
            .pipe(gulp.dest(config.dist.img));
    };
};
const gulp = require('gulp');

module.exports = (gulp, config , isDist) => {
    return () => {
         gulp.src(config.src.manifest)
            .pipe(gulp.dest(config.dist.manifest));
    };
};
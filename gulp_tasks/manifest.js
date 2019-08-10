const gulp = require('gulp');

module.exports = (gulp, config, isDist) => {
    return (done) => {
        gulp.src(config.src.manifest)
            .pipe(gulp.dest(config.dist.manifest));
        done();
    };
};
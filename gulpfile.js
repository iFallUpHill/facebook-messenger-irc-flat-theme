// --------------------------------------------------------------------
// Declare Variables
// --------------------------------------------------------------------

const gulp    = require('gulp'),
      argv    = require('yargs').argv,
      del     = require('del'),
      isDist  = argv.prod ? true : false,
      config  = {
            src: {
                sass: 'src/scss/**/*.scss',
                js: 'src/js/scripts.js',
                img: 'src/img/**/*',
                manifest: 'src/manifest.json'

            },
            dist: {
                css: 'dist',
                js: 'dist',
                img: 'dist/img',
                manifest: 'dist',
                min_css: 'styles.min.css',
                min_js: 'scripts.min.js',
            }
        };

// --------------------------------------------------------------------
// Loader Function
// --------------------------------------------------------------------

function getTask(task) {
    return require('./gulp_tasks/' + task)(gulp, config, isDist);
}

// --------------------------------------------------------------------
// Define Tasks
// --------------------------------------------------------------------

gulp.task('sass', getTask('sass'));
gulp.task('js', getTask('scripts'));
gulp.task('img', getTask('images'));
gulp.task('manifest', getTask('manifest'));

// --------------------------------------------------------------------
// Extra Task: Clean
// --------------------------------------------------------------------

gulp.task('clean', () => {
    return del('dist');
});

// --------------------------------------------------------------------
// Extra Task: Watch
// --------------------------------------------------------------------

gulp.task('watch', () => {
    gulp.watch(config.src.sass, gulp.series('sass'));
    gulp.watch(config.src.js, gulp.series('js'));
    gulp.watch(config.src.img, gulp.series('img'));
    gulp.watch(config.src.manifest, gulp.series('manifest'));
});

// --------------------------------------------------------------------
// Task Runner: Build (Use --prod for production build)
// --------------------------------------------------------------------

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('sass', 'js', 'img', 'manifest')
));

// --------------------------------------------------------------------
// Task Runner: Default
// --------------------------------------------------------------------

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('sass', 'js', 'img', 'manifest'),
    'watch'
));
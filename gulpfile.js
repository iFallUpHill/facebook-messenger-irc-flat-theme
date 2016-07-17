// --------------------------------------------------------------------
// Declare Variables
// --------------------------------------------------------------------

const gulp    = require('gulp'),
      argv    = require('yargs').argv,
      del     = require('del'),
      runSeq  = require("run-sequence"),
      isDist  = argv.prod ? true : false,
      config  = {
            src: {
                sass: [
                    '!src/scss/_constants.scss',
                    'src/scss/main.scss',
                    'src/scss/*.scss'
                ],
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

gulp.task('clean', function() {
    del('dist');
});

// --------------------------------------------------------------------
// Extra Task: Watch
// --------------------------------------------------------------------

gulp.task('watch', function() {
    gulp.watch(config.src.sass, ['sass']);
    gulp.watch(config.src.js, ['js']);
    gulp.watch(config.src.img, ['img']);
    gulp.watch(config.src.manifest, ['manifest']);
});

// --------------------------------------------------------------------
// Task Runner: Build (Use --prod for production build)
// --------------------------------------------------------------------

gulp.task('build', function(callback) {
    runSeq('clean', ['sass', 'js', 'img', 'manifest'], callback);
});

// --------------------------------------------------------------------
// Task Runner: Default
// --------------------------------------------------------------------

gulp.task('default', function(callback) {
    runSeq('clean', ['sass', 'js', 'img', 'manifest'], 'watch', callback);
});
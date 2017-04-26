var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');

var path = {
    js: 'src/js/*.js',
    css: 'src/css/*.css'
}

gulp.task('watch', function() {
    gulp.watch(path.js, ['combine-js'])
});
gulp.task('combine-js', function() {
    return gulp.src([
        'src/js/polyfill.js',
        'src/js/define.js',
        'src/js/h2m.js',
        'src/js/cookie.js',
        'src/js/platformUtil.js',
        'src/js/stringUtil.js'
    ])
        .pipe(plumber(function(err) {
            gutil.log(err.message);
        }))
        .pipe(stripDebug()) // alert, console 제거
        .pipe(uglify()) // minify
    	.pipe(concat('h2m.js'))
    	.pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['combine-js', 'watch']);

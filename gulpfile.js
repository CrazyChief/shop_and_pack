var gulp = require('gulp'),
    amdOptimize = require("amd-optimize"),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    include = require('gulp-include'),
    sass = require('gulp-sass');

var historyApiFallback = require('connect-history-api-fallback');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var path = {
    build: {
        css: 'css/'
    },
    src: {
        style: 'sass/app.scss'
    },
    watch: {
        style: ['sass/**/*.scss', 'sass/*.scss'],
        html: ['templates/**/*.html','app/**/*.html','app/modules/**/*.html'],
        js: ['app/**/*.js'],
        svg: ['svg/*.svg']
    }
};

gulp.task('sass', function () {
    gulp.src(path.src.style)
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream({match: '**/*.css'}))
});

gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: {
            baseDir: "./",
            middleware: [historyApiFallback({})]
        }
    });

    gulp.watch(path.watch.style, ['sass']);
    gulp.watch(path.watch.html).on('change', browserSync.reload);
    gulp.watch(path.watch.js).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);


gulp.task('amdBuild', function () {
    gulp.src('.//*.js', {base: './'})
        .pipe(amdOptimize("initialize", {
            baseUrl: './',
            configFile: './initialize.js',
            findNestedDependencies: true
        }))
        .pipe(concat('tmp.js'))
        .pipe(gulp.dest('build'));
});
gulp.task('scripts', ['amdBuild'], function (cb) {
    gulp.src(['vendor/require.js', 'build/tmp.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});